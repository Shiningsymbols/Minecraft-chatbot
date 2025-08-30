const arabicLettersData = {
    "ا": { "isolated": { "base": "ا" }, "final": { "base": "ﺎ" } },
    "ب": { "isolated": { "base": "ب" }, "initial": { "base": "ﺑ" }, "medial": { "base": "ﺒ" }, "final": { "base": "ﺏ" } },
    "ت": { "isolated": { "base": "ت" }, "initial": { "base": "ﺗ" }, "medial": { "base": "ﺘ" }, "final": { "base": "ﺕ" } },
    "ث": { "isolated": { "base": "ث" }, "initial": { "base": "ﺛ" }, "medial": { "base": "ﺜ" }, "final": { "base": "ﺙ" } },
    "ج": { "isolated": { "base": "ج" }, "initial": { "base": "ﺟ" }, "medial": { "base": "ﺠ" }, "final": { "base": "ﺝ" } },
    "ح": { "isolated": { "base": "ح" }, "initial": { "base": "ﺣ" }, "medial": { "base": "ﺤ" }, "final": { "base": "ﺡ" } },
    "خ": { "isolated": { "base": "خ" }, "initial": { "base": "ﺧ" }, "medial": { "base": "ﺨ" }, "final": { "base": "ﺥ" } },
    "د": { "isolated": { "base": "د" }, "final": { "base": "ﺪ" } },
    "ذ": { "isolated": { "base": "ذ" }, "final": { "base": "ﺬ" } },
    "ر": { "isolated": { "base": "ر" }, "final": { "base": "ﺮ" } },
    "ز": { "isolated": { "base": "ز" }, "final": { "base": "ﺰ" } },
    "س": { "isolated": { "base": "س" }, "initial": { "base": "ﺳ" }, "medial": { "base": "ﺴ" }, "final": { "base": "ﺱ" } },
    "ش": { "isolated": { "base": "ش" }, "initial": { "base": "ﺷ" }, "medial": { "base": "ﺸ" }, "final": { "base": "ﺵ" } },
    "ص": { "isolated": { "base": "ص" }, "initial": { "base": "ﺻ" }, "medial": { "base": "ﺼ" }, "final": { "base": "ﺹ" } },
    "ض": { "isolated": { "base": "ض" }, "initial": { "base": "ﺿ" }, "medial": { "base": "ﻀ" }, "final": { "base": "ﺽ" } },
    "ط": { "isolated": { "base": "ط" }, "initial": { "base": "ﻃ" }, "medial": { "base": "ﻄ" }, "final": { "base": "ﻁ" } },
    "ظ": { "isolated": { "base": "ظ" }, "initial": { "base": "ﻇ" }, "medial": { "base": "ﻈ" }, "final": { "base": "ﻅ" } },
    "ع": { "isolated": { "base": "ع" }, "initial": { "base": "ﻋ" }, "medial": { "base": "ﻌ" }, "final": { "base": "ﻉ" } },
    "غ": { "isolated": { "base": "غ" }, "initial": { "base": "ﻏ" }, "medial": { "base": "ﻐ" }, "final": { "base": "ﻍ" } },
    "ف": { "isolated": { "base": "ف" }, "initial": { "base": "ﻓ" }, "medial": { "base": "ﻔ" }, "final": { "base": "ﻑ" } },
    "ق": { "isolated": { "base": "ق" }, "initial": { "base": "ﻗ" }, "medial": { "base": "ﻘ" }, "final": { "base": "ﻕ" } },
    "ك": { "isolated": { "base": "ك" }, "initial": { "base": "ﻛ" }, "medial": { "base": "ﻜ" }, "final": { "base": "ﻙ" } },
    "ل": { "isolated": { "base": "ل" }, "initial": { "base": "ﻟ" }, "medial": { "base": "ﻠ" }, "final": { "base": "ﻝ" } },
    "م": { "isolated": { "base": "م" }, "initial": { "base": "ﻣ" }, "medial": { "base": "ﻤ" }, "final": { "base": "ﻡ" } },
    "ن": { "isolated": { "base": "ن" }, "initial": { "base": "ﻧ" }, "medial": { "base": "ﻨ" }, "final": { "base": "ﻥ" } },
    "ه": { "isolated": { "base": "ه" }, "initial": { "base": "ﻫ" }, "medial": { "base": "ﻬ" }, "final": { "base": "ﻩ" } },
    "و": { "isolated": { "base": "و" }, "final": { "base": "ﻮ" } },
    "ي": { "isolated": { "base": "ي" }, "initial": { "base": "ﻳ" }, "medial": { "base": "ﻴ" }, "final": { "base": "ﻱ" } },
    "ء": { "isolated": { "base": "ء" } }, "أ": { "isolated": { "base": "أ" }, "final": { "base": "ﺄ" } },
    "إ": { "isolated": { "base": "إ" }, "final": { "base": "ﺈ" } }, "آ": { "isolated": { "base": "آ" }, "final": { "base": "ﺂ" } },
    "ة": { "isolated": { "base": "ة" }, "final": { "base": "ﺔ" } }, "ى": { "isolated": { "base": "ى" }, "final": { "base": "ﻰ" } },
    "لا": { "isolated": { "base": "لا" }, "initial": {"base": "ﻻ"}, "medial": { "base": "ﻼ" }, "final": { "base": "ﻻ" } },
};
const harakatMap = {'َ':'fatha','ُ':'damma','ِ':'kasra','ْ':'sukun','ّ':'shadda'};
const harakatChars = Object.keys(harakatMap);
const nonConnecting = ['ا','د','ذ','ر','ز','و','ء','أ','إ','آ','ة','ى'];
function getForm(letter,pos,haraka='base'){const l=arabicLettersData[letter];if(!l)return letter;const p=l[pos];if(!p)return l.isolated[haraka]||l.isolated.base;const f=p[haraka]||p.base;return f!==undefined?(f||(l.isolated[haraka]||l.isolated.base)):(l.isolated[haraka]||l.isolated.base)}
function convertWord(word){if(!word.trim())return word;const t=[];for(let i=0;i<word.length;i++){const c=word[i];if(arabicLettersData[c]){let h='base';if(i+1<word.length&&harakatChars.includes(word[i+1])){h=harakatMap[word[i+1]];i++}t.push({letter:c,haraka:h,isLetter:true})}else{t.push({letter:c,haraka:'base',isLetter:false})}}const r=[];for(let i=0;i<t.length;i++){const c=t[i];if(!c.isLetter){r.push(c.letter);continue}const p=t[i-1];const n=t[i+1];if(c.letter==='ل'&&n&&n.letter==='ا'){const C=p&&p.isLetter&&!nonConnecting.includes(p.letter);const l=C?'medial':'initial';r.push(getForm('لا',l,c.haraka));i++;continue}const C=p&&p.isLetter&&!nonConnecting.includes(p.letter);const N=n&&n.isLetter&&!nonConnecting.includes(c.letter);let s;if(!C&&N)s='initial';else if(C&&N)s='medial';else if(C&&!N)s='final';else s='isolated';r.push(getForm(c.letter,s,c.haraka))}return r.reverse().join('')}
function convertArabicText(text){if(!text||!text.trim())return text;const p=text.split(/(\s+)/);const c=p.map(p=>/^\s+$/.test(p)?p:convertWord(p));return c.reverse().join('')}
module.exports={convertArabicText};