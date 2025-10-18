/* problems.js
   Programmatically generates 50 problems per language (Python, JavaScript, C, Java, C++).
   Each problem: title, level (easy/medium/hard), description, sampleInput, sampleOutput
*/

(function(){
  // curated base templates (diverse common problems)
  const templates = [
    {title:"FizzBuzz", level:"easy", desc:"Print numbers from 1 to N. For multiples of 3 print Fizz, for multiples of 5 print Buzz, for both print FizzBuzz.", input:"15", output:"1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"},
    {title:"Palindrome Check", level:"easy", desc:"Given a string, check if it is a palindrome (case-insensitive, ignore spaces). Return Yes/No.", input:"madam", output:"Yes"},
    {title:"Factorial", level:"easy", desc:"Compute factorial of a non-negative integer n (n!).", input:"5", output:"120"},
    {title:"Fibonacci Sequence", level:"easy", desc:"Print first N Fibonacci numbers starting from 0,1.", input:"6", output:"0 1 1 2 3 5"},
    {title:"Two Sum", level:"easy", desc:"Given array and target, return indices (0-based) of two numbers that add to target (any valid pair).", input:"[2,7,11,15],9", output:"0,1"},
    {title:"Reverse String", level:"easy", desc:"Reverse the input string.", input:"hello", output:"olleh"},
    {title:"Count Vowels", level:"easy", desc:"Count vowels (a,e,i,o,u) in a string.", input:"education", output:"5"},
    {title:"Max Element", level:"easy", desc:"Find the largest element in an integer array.", input:"[3,5,1,9,2]", output:"9"},
    {title:"Second Largest", level:"easy", desc:"Find the second largest distinct element in array.", input:"[5,1,5,3,2]", output:"3"},
    {title:"Sum of Digits", level:"easy", desc:"Sum digits of a non-negative integer.", input:"1234", output:"10"},
    {title:"Anagram Check", level:"medium", desc:"Check if two strings are anagrams of each other (ignore case & spaces).", input:"listen,silent", output:"Yes"},
    {title:"Binary Search", level:"medium", desc:"Perform binary search on sorted array; return index or -1.", input:"[1,3,5,7,9],7", output:"3"},
    {title:"Merge Sorted Arrays", level:"medium", desc:"Merge two sorted arrays and return sorted result.", input:"[1,4,7],[2,3,6]", output:"[1,2,3,4,6,7]"},
    {title:"Rotate Array", level:"medium", desc:"Rotate array right by k steps.", input:"[1,2,3,4,5],2", output:"[4,5,1,2,3]"},
    {title:"Remove Duplicates", level:"medium", desc:"Remove duplicates from array preserving order.", input:"[1,2,2,3,1]", output:"[1,2,3]"},
    {title:"Valid Parentheses", level:"medium", desc:"Given a string of parentheses, determine if valid (balanced).", input:"()[{}]", output:"True"},
    {title:"Merge Intervals", level:"medium", desc:"Given list of intervals, merge overlapping intervals.", input:"[[1,3],[2,6],[8,10]]", output:"[[1,6],[8,10]]"},
    {title:"Longest Substring Without Repeat", level:"medium", desc:"Find length of longest substring without repeating characters.", input:"abcabcbb", output:"3"},
    {title:"Kth Smallest Element", level:"medium", desc:"Find k-th smallest element in unsorted array.", input:"[7,10,4,3,20,15],3", output:"7"},
    {title:"Binary Tree Inorder", level:"medium", desc:"Return inorder traversal of binary tree (iterative/recursive).", input:"[1,null,2,3]", output:"[1,3,2]"},
    {title:"Dijkstra's Algorithm", level:"hard", desc:"Find shortest path distances from source in weighted graph (non-negative weights).", input:"graph,source", output:"distances array"},
    {title:"Topological Sort", level:"hard", desc:"Return topological order of DAG or indicate cycle.", input:"graph", output:"topological order or error"},
    {title:"N-Queens", level:"hard", desc:"Place N queens on NxN board so none attack each other; return one valid board or all solutions.", input:"4", output:"[[.\"Q\"...]] (example)"},
    {title:"Knapsack 0/1", level:"hard", desc:"Given weights and values and capacity, maximize value (0/1 knapsack).", input:"weights:[2,3,4],values:[4,5,6],W=5", output:"9"},
    {title:"LRU Cache", level:"hard", desc:"Design LRU cache with get and put operations (O(1)).", input:"operations", output:"results"},
    {title:"Word Break", level:"hard", desc:"Given string and dictionary, determine if string can be segmented.", input:"leetcode,[leet,code]", output:"True"},
    {title:"Longest Increasing Subsequence", level:"hard", desc:"Return length of LIS in array.", input:"[10,9,2,5,3,7,101,18]", output:"4"},
    {title:"Merge K Sorted Lists", level:"hard", desc:"Merge k sorted linked lists and return as one sorted list.", input:"lists", output:"merged list"},
    {title:"Find Cycle in Graph", level:"hard", desc:"Detect cycle in directed/undirected graph.", input:"graph", output:"True/False"},
    {title:"Minimum Window Substring", level:"hard", desc:"Find minimum window in string S that contains all characters of T.", input:"S:ADOBECODEBANC,T:ABC", output:"BANC"},
    {title:"Substring with Concatenation", level:"hard", desc:"Find starting indices of substring(s) formed by concatenation of all words.", input:"", output:"indices"},
    {title:"Integer to Roman", level:"medium", desc:"Convert integer to roman numeral.", input:"1994", output:"MCMXCIV"},
    {title:"Roman to Integer", level:"medium", desc:"Convert roman numeral to integer.", input:"MCMXCIV", output:"1994"},
    {title:"Evaluate Reverse Polish Notation", level:"medium", desc:"Evaluate RPN expression.", input:"[\"2\",\"1\",\"+\",\"3\",\"*\"]", output:"9"},
    {title:"Product of Array Except Self", level:"medium", desc:"Return product of array except self without using division.", input:"[1,2,3,4]", output:"[24,12,8,6]"},
    {title:"Subarray Sum Equals K", level:"medium", desc:"Count number of continuous subarrays whose sum equals k.", input:"[1,1,1],2", output:"2"},
    {title:"Min Cost Climbing Stairs", level:"easy", desc:"Min cost to reach top of stairs given cost array.", input:"[10,15,20]", output:"15"},
  ];

  const languages = ["python","javascript","c","java","cpp"];

  // helper to create sample IO if missing
  function sampleIOFromTemplate(t, idx){
    // we'll tweak some sample outputs so they look concrete
    const baseIn = t.input;
    const baseOut = t.output;
    // append case info to make each sample slightly different
    return { sampleInput: baseIn, sampleOutput: baseOut };
  }

  // Build problems object: 50 per language
  const problems = {};
  languages.forEach(lang=>{
    problems[lang] = [];
    for(let i=0;i<50;i++){
      const tmpl = templates[i % templates.length];
      const seq = i+1;
      const level = tmpl.level;
      const title = `${tmpl.title} (${lang.toUpperCase()}) #${seq}`;
      const desc = `${tmpl.desc}\nLanguage: ${lang.toUpperCase()}\nProblem #${seq}`;
      const io = sampleIOFromTemplate(tmpl, seq);
      // slightly vary input for variety
      const sampleInput = (typeof io.sampleInput === 'string' && io.sampleInput.length>0) ? `${io.sampleInput}` : `${io.sampleInput}`;
      const sampleOutput = (typeof io.sampleOutput === 'string' && io.sampleOutput.length>0) ? `${io.sampleOutput}` : `${io.sampleOutput}`;
      problems[lang].push({
        id: `${lang}-${seq}`,
        title,
        level,
        description: desc,
        sampleInput,
        sampleOutput
      });
    }
  });

  // Expose globally
  window.PROBLEMS = problems;
})();
// script.js
// This file depends on problems.js which exposes window.PROBLEMS

// Wait until DOM loaded and problems.js executed
document.addEventListener("DOMContentLoaded", () => {

  // Slider
  (function sliderInit(){
    const slides = document.querySelectorAll('.slide');
    if(!slides || slides.length === 0) return;
    let idx = 0;
    function show(i){ slides.forEach((s,k)=> s.classList.toggle('active', k===i)); }
    show(idx);
    setInterval(()=>{ idx = (idx+1) % slides.length; show(idx); }, 4000);
  })();

  // Globals
  const problems = window.PROBLEMS || {};
  let currentLang = null;
  let currentProblem = null;

  const modal = document.getElementById("questionModal");
  const modalTitle = document.getElementById("modalTitle");
  const questionList = document.getElementById("questionList");
  const searchBox = document.getElementById("searchBox");
  const filterLevel = document.getElementById("filterLevel");
  const detailCard = document.getElementById("detailCard");
  const editorTitle = document.getElementById("editorTitle");
  const problemDescription = document.getElementById("problemDescription");
  const sampleInput = document.getElementById("sampleInput");
  const sampleOutput = document.getElementById("sampleOutput");
  const codeEditor = document.getElementById("codeEditor");
  const runBtn = document.getElementById("runBtn");
  const outputBox = document.getElementById("outputBox");
  const downloadBtn = document.getElementById("downloadBtn");

  // openModal / closeModal exposed globally for inline buttons
  window.openModal = function(lang){
    if(!problems[lang]) {
      alert("No problems for " + lang);
      return;
    }
    currentLang = lang;
    modal.style.display = "block";
    modal.setAttribute('aria-hidden','false');
    modalTitle.textContent = `${lang.toUpperCase()} — 50 Problems`;
    searchBox.value = "";
    filterLevel.value = "all";
    renderQuestions();
  };

  window.closeModal = function(){
    modal.style.display = "none";
    modal.setAttribute('aria-hidden','true');
    detailCard.style.display = "none";
    currentLang = null;
    currentProblem = null;
    codeEditor.value = "";
    outputBox.textContent = "";
  };

  // Close on backdrop click
  window.addEventListener('click', (e)=>{
    if(e.target === modal) window.closeModal();
  });

  // Render list
  function renderQuestions(){
    if(!currentLang) return;
    const list = problems[currentLang];
    const q = searchBox.value.trim().toLowerCase();
    const filter = filterLevel.value;
    questionList.innerHTML = "";
    list
      .filter(item => (filter === 'all' || item.level === filter) && (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)))
      .forEach((item, idx) => {
        const li = document.createElement('li');
        const left = document.createElement('div');
        left.style.flex = '1';
        left.innerHTML = `<strong>${idx+1}. ${item.title}</strong><div style="font-size:0.85rem;color:#a8c7e6">${item.level.toUpperCase()}</div>`;
        const btn = document.createElement('button');
        btn.textContent = "Open";
        btn.style.background="#38bdf8";
        btn.style.color="#042231";
        btn.style.borderRadius="6px";
        btn.style.padding="6px 10px";
        btn.onclick = (ev)=>{
          ev.stopPropagation();
          openEditor(item);
        };
        li.appendChild(left);
        li.appendChild(btn);
        li.onclick = ()=> openEditor(item);
        questionList.appendChild(li);
      });
  }

  // Search + filter events
  searchBox.addEventListener('input', renderQuestions);
  filterLevel.addEventListener('change', renderQuestions);

  // Open editor / detail view for a problem
  function openEditor(problem){
    currentProblem = problem;
    detailCard.style.display = 'block';
    editorTitle.textContent = problem.title;
    problemDescription.textContent = problem.description;
    sampleInput.textContent = problem.sampleInput || '';
    sampleOutput.textContent = problem.sampleOutput || '';
    // Prefill codeEditor with a small language-specific template
    const lang = currentLang;
    const headerComment = `// ${problem.title}\n// ${problem.level.toUpperCase()} - ${lang.toUpperCase()}\n// ${problem.description}\n\n`;
    if(lang === 'javascript'){
      codeEditor.value = `${headerComment}// Example: write JS code below\nfunction solve(){\n  // read input from variable 'input'\n  // implement and return or console.log output\n}\n\nconsole.log('Write your solution inside solve() and call it');`;
    } else if(lang === 'python'){
      codeEditor.value = `# ${problem.title}\n# ${problem.level.toUpperCase()} - PYTHON\n# ${problem.description}\n\n# Example: read input and print output\n# input_str = input().strip()\n# print(...)`;
    } else if(lang === 'c' || lang === 'cpp' || lang === 'java'){
      codeEditor.value = `/* ${problem.title} - ${lang.toUpperCase()} */\n/* ${problem.description} */\n\n// Write your solution here (code editor is for writing only; execution supported for JS only).`;
    } else {
      codeEditor.value = `${headerComment}// Write your solution here`;
    }
    outputBox.textContent = '';
  }

  // Run button: only works when currentLang === 'javascript'
  runBtn.addEventListener('click', ()=>{
    if(!currentProblem) { outputBox.textContent = "Select a problem first."; return; }
    if(currentLang !== 'javascript'){
      outputBox.textContent = "⚠️ Code execution is only supported for JavaScript problems in this demo.";
      return;
    }
    // execute JS code in safe-ish sandbox (still eval => for local/dev use only)
    const code = codeEditor.value;
    try {
      // wrap in function so console.log can be used; capture returned value
      const wrapped = `(function(){\n${code}\n})();`;
      const result = eval(wrapped);
      outputBox.textContent = (result !== undefined) ? String(result) : "Code executed (no returned value). Check console for logs.";
    } catch (err) {
      outputBox.textContent = "Error: " + err.message;
    }
  });

  // Download code button
  downloadBtn.addEventListener('click', ()=>{
    if(!currentProblem) return alert('Open a problem first');
    const blob = new Blob([codeEditor.value], {type:'text/plain'});
    const fname = `${currentLang}_${currentProblem.id}.txt`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fname; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  // expose renderQuestions for external calls
  window.renderQuestions = renderQuestions;

}); // DOMContentLoaded end