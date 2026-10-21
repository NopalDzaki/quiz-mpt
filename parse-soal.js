const fs = require('fs');
const path = require('path');

function parseClaude(content) {
  const questions = [];
  const blocks = content.split(/^## Soal \d+/m).slice(1);

  for (const block of blocks) {
    const q = {};
    
    // Level
    const levelMatch = block.match(/- Level:\s*(.+)/);
    q.level = levelMatch ? levelMatch[1].trim() : '';
    
    // Topik
    const topikMatch = block.match(/- Topik:\s*(.+)/);
    q.topic = topikMatch ? topikMatch[1].trim() : '';
    
    // Pertanyaan
    const pertanyaanMatch = block.match(/- Pertanyaan:\s*(.+)/);
    q.question = pertanyaanMatch ? pertanyaanMatch[1].trim() : '';
    
    // Options A-D
    q.options = {};
    const optA = block.match(/^- A\.\s*(.+)/m);
    const optB = block.match(/^- B\.\s*(.+)/m);
    const optC = block.match(/^- C\.\s*(.+)/m);
    const optD = block.match(/^- D\.\s*(.+)/m);
    q.options.A = optA ? optA[1].trim() : '';
    q.options.B = optB ? optB[1].trim() : '';
    q.options.C = optC ? optC[1].trim() : '';
    q.options.D = optD ? optD[1].trim() : '';
    
    // Jawaban
    const jawabanMatch = block.match(/- Jawaban:\s*([A-D])/);
    q.answer = jawabanMatch ? jawabanMatch[1].trim() : '';
    
    // Penjelasan per opsi
    q.explanations = {};
    const explA = block.match(/- A \([^)]+\):\s*(.+)/);
    const explB = block.match(/- B \([^)]+\):\s*(.+)/);
    const explC = block.match(/- C \([^)]+\):\s*(.+)/);
    const explD = block.match(/- D \([^)]+\):\s*(.+)/);
    q.explanations.A = explA ? explA[1].trim() : '';
    q.explanations.B = explB ? explB[1].trim() : '';
    q.explanations.C = explC ? explC[1].trim() : '';
    q.explanations.D = explD ? explD[1].trim() : '';
    
    if (q.question && q.answer) {
      questions.push(q);
    }
  }
  
  return questions;
}

function parseGemini(content) {
  const questions = [];
  const blocks = content.split(/^### Soal \d+/m).slice(1);

  for (const block of blocks) {
    const q = {};
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    
    // Question text: everything before the first "A." line
    let questionLines = [];
    let optionStartIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^A[\.\s]/.test(lines[i])) {
        optionStartIdx = i;
        break;
      }
      questionLines.push(lines[i]);
    }
    q.question = questionLines.join(' ').replace(/\*\*/g, '').trim();
    
    q.level = ''; 
    q.topic = '';
    
    // Options
    q.options = {};
    if (optionStartIdx >= 0) {
      for (let i = optionStartIdx; i < lines.length; i++) {
        const optMatch = lines[i].match(/^([A-D])[\.\s]+(.+)/);
        if (optMatch) {
          q.options[optMatch[1]] = optMatch[2].replace(/\*\*/g, '').trim();
        }
        if (lines[i].startsWith('**Kunci')) break;
      }
    }
    
    // Answer
    const answerMatch = block.match(/\*\*Kunci Jawaban:\*\*\s*([A-D])/);
    q.answer = answerMatch ? answerMatch[1] : '';
    
    // Explanations
    q.explanations = {};
    const explRegex = /- \*\*([A-D])\s+(?:Salah|Benar)[^:]*:\*\*\s*(.+)/g;
    let m;
    while ((m = explRegex.exec(block)) !== null) {
      q.explanations[m[1]] = m[2].trim();
    }
    
    // Also try format: - **A Salah:** or - **A Benar (Kecuali):**
    if (Object.keys(q.explanations).length === 0) {
      const explRegex2 = /- \*\*([A-D])\s+[^:]+:\*\*\s*(.+)/g;
      while ((m = explRegex2.exec(block)) !== null) {
        q.explanations[m[1]] = m[2].trim();
      }
    }
    
    if (q.question && q.answer) {
      questions.push(q);
    }
  }
  
  for (let i = 0; i < questions.length; i++) {
    if (i < 20) questions[i].level = 'Mudah';
    else if (i < 40) questions[i].level = 'Sedang';
    else questions[i].level = 'Sulit';
  }
  
  return questions;
}


function parseChatGPT(content) {
  const questions = [];
  // Split by ## M01, ## S21, ## H41 patterns
  const blocks = content.split(/^## [MSH]\d+\s*---/m).slice(1);

  for (const block of blocks) {
    const q = {};
    
    // Level
    const levelMatch = block.match(/\*\*Tingkat:\*\*\s*(.+?)[\\\n]/);
    q.level = levelMatch ? levelMatch[1].trim() : '';
    
    // Topik
    const topikMatch = block.match(/\*\*Topik:\*\*\s*(.+?)[\\\n]/);
    q.topic = topikMatch ? topikMatch[1].trim() : '';
    
    // Question - multi-line possible
    const soalMatch = block.match(/\*\*Soal:\*\*\s*([\s\S]*?)(?=\n\s*-\s+\*\*[A-D])/);
    if (soalMatch) {
      q.question = soalMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    } else {
      q.question = '';
    }
    
    // Options
    q.options = {};
    const optRegex = /-\s+\*\*([A-D])\.\*\*\s*([\s\S]*?)(?=(?:\n\s*-\s+\*\*[A-D]\.\*\*)|\n\s*\*\*Kunci)/g;
    let m;
    while ((m = optRegex.exec(block)) !== null) {
      q.options[m[1]] = m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }
    
    // If regex didn't catch, try simpler approach
    if (Object.keys(q.options).length < 4) {
      const simpleOptRegex = /-\s+\*\*([A-D])\.\*\*\s*(.+)/g;
      q.options = {};
      while ((m = simpleOptRegex.exec(block)) !== null) {
        q.options[m[1]] = m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      }
    }
    
    // Answer
    const answerMatch = block.match(/\*\*Kunci jawaban:\*\*\s*([A-D])/i);
    q.answer = answerMatch ? answerMatch[1] : '';
    
    // Explanations
    q.explanations = {};
    const explRegex2 = /-\s+\*\*([A-D])\s*---\s*(?:Benar|Salah)\.\*\*\s*([\s\S]*?)(?=(?:\n\s*-\s+\*\*[A-D])|\n\s*---|\n\s*#{1,3}\s|\s*$)/g;
    while ((m = explRegex2.exec(block)) !== null) {
      q.explanations[m[1]] = m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }
    
    if (q.question && q.answer) {
      questions.push(q);
    }
  }
  
  // Fix levels: Mudah -> Sedang -> Sulit mapping
  for (const q of questions) {
    if (q.level === 'Sedang' || q.level === 'sedang') q.level = 'Sedang';
    else if (q.level === 'Sulit' || q.level === 'sulit') q.level = 'Sulit';
    else q.level = 'Mudah';
  }
  
  return questions;
}

// ============================================================
// MAIN
// ============================================================
const bankDir = path.join(__dirname, 'bank-soal');

const claudeContent = fs.readFileSync(path.join(bankDir, 'bank-soal-CLAUDE.md'), 'utf-8');
const geminiContent = fs.readFileSync(path.join(bankDir, 'bank-soal-GEMINI.md'), 'utf-8');
const chatgptContent = fs.readFileSync(path.join(bankDir, 'bank-soal-chatGPT.md'), 'utf-8');

const claudeQuestions = parseClaude(claudeContent);
const geminiQuestions = parseGemini(geminiContent);
const chatgptQuestions = parseChatGPT(chatgptContent);

console.log(`Claude: ${claudeQuestions.length} soal`);
console.log(`Gemini: ${geminiQuestions.length} soal`);
console.log(`ChatGPT: ${chatgptQuestions.length} soal`);

const data = {
  claude: claudeQuestions,
  gemini: geminiQuestions,
  chatgpt: chatgptQuestions
};

fs.writeFileSync(path.join(__dirname, 'soal-data.json'), JSON.stringify(data, null, 2), 'utf-8');
console.log('\n✅ soal-data.json berhasil dibuat!');

// Quick validation
for (const [name, qs] of Object.entries(data)) {
  let missing = 0;
  for (const q of qs) {
    if (!q.question || !q.answer || Object.keys(q.options).length < 4) {
      missing++;
    }
  }
  if (missing > 0) {
    console.log(`⚠️  ${name}: ${missing} soal ada field kosong`);
  }
}
