// ✨ 1. استدعاء مكتبة express لخادم الويب
const express = require('express');
const bedrock = require('bedrock-protocol');
const https = require('https');
const { convertArabicText } = require('./arabic-fix.js');

// ✨ 2. تهيئة تطبيق الويب
const app = express();
// ✨ 3. تحديد البورت الذي ستعمل عليه الخدمة (Render يحدده تلقائيًا)
const PORT = process.env.PORT || 3000;


const BOT_USERNAME = '§bAI§f';
const GEMINI_API_KEYS = [
    'AIzaSyC1kNl0QE8_lObtQU_VyxLBNGrQfB_bEe0',
    'AIzaSyD3pu8Gv_7nB4iN5zJqZCgTX8MbjSGf4d8',
    'AIzaSyAhQ6Zzqt45LvMUw4sfNcSkOJuuq4o_BvU'
];

function getRandomApiKey() {
    const randomIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
    return GEMINI_API_KEYS[randomIndex];
}

const conversations = {};
const MAX_HISTORY_LENGTH = 6;

function processOnlyArabicParts(text) {
    const arabicRegex = /([\u0600-\u06FF\s.,!؟]+)/g;
    return text.replace(arabicRegex, (match) => {
        return convertArabicText(match);
    });
}

const client = bedrock.createClient({
  host: 'emerald.magmanode.com',
  port: 26222,
  username: BOT_USERNAME,
  offline: true,
  version: '1.21.100'
});

async function getAIResponse(history) {
    return new Promise((resolve) => {
        const currentApiKey = getRandomApiKey();
        const geminiContents = history.map(turn => ({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.content }]
        }));
        const systemPrompt = {
            parts: [{
                text: "You are a friendly assistant in Minecraft bedrock chat. Give short responses, Don't send emojis. You can remember the last few messages in our conversation."
            }]
        };
        const postData = JSON.stringify({
            contents: geminiContents,
            systemInstruction: systemPrompt
        });
        const options = {
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${currentApiKey}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (data.candidates && data.candidates[0].content.parts[0]) {
                        resolve(data.candidates[0].content.parts[0].text.substring(0, 100));
                    } else {
                        console.error('Unexpected API response:', body);
                        resolve("عذراً، لدي مشكلة في الاتصال بالـAPI.");
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error.message);
                    resolve("عذراً، حدث خطأ بسيط.");
                }
            });
        });
        req.on('error', (error) => {
            console.error('Error with API request:', error.message);
            resolve("لا يمكنني الاتصال بـ'عقلي' الآن.");
        });
        req.write(postData);
        req.end();
    });
}

client.on('spawn', () => {
  console.log('Bot connected!');
  setTimeout(() => {
    const welcomeMessage = 'How i can help you §b=)§f';
    client.write('text', {
      type: 'chat',
      needs_translation: false,
      source_name: BOT_USERNAME,
      xuid: '',
      platform_chat_id: '',
      message: processOnlyArabicParts(welcomeMessage),
      parameters: [],
      filtered_message: ''
    });
  }, 2000);
});

client.on('text', async (packet) => {
  if (packet.type !== 'chat' || packet.source_name === BOT_USERNAME) return;

  const player = packet.source_name;
  const originalMessage = packet.message;

  if (!originalMessage.startsWith('!')) {
      return;
  }
  
  const messageContent = originalMessage.substring(1).trim();

  if (!messageContent) {
      return;
  }

  if (!conversations[player]) {
    conversations[player] = [];
  }

  const playerHistory = conversations[player];
  console.log(`[${player}] In: ${messageContent}`);
  playerHistory.push({ role: 'user', content: messageContent });

  while (playerHistory.length > MAX_HISTORY_LENGTH) {
    playerHistory.shift();
  }

  const reply = await getAIResponse(playerHistory);
  playerHistory.push({ role: 'assistant', content: reply });

   while (playerHistory.length > MAX_HISTORY_LENGTH) {
    playerHistory.shift();
  }

  setTimeout(() => {
    const finalMessage = `@${player} ${reply}`;
    const processedMessage = processOnlyArabicParts(finalMessage);

    client.write('text', {
      type: 'chat',
      needs_translation: false,
      source_name: BOT_USERNAME,
      xuid: '',
      platform_chat_id: '',
      message: processedMessage,
      parameters: [],
      filtered_message: ''
    });

    console.log(`[Bot to ${player}] Out: ${processedMessage}`);
  }, 1500);
});

client.on('error', (err) => {
  console.error('Error:', err.message);
});

// ✨ 4. كود الواجهة الوهمية لإبقاء الخدمة تعمل
app.get('/', (req, res) => {
  res.status(200).send('Bot is running and ready!');
});

// ✨ 5. تشغيل خادم الويب والبوت معًا
app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT} to keep the bot alive.`);
  console.log('Starting AI Bot...');
});