
// Initialize Mermaid
if (window.mermaid) {
    mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base'
    });
}

function showContent(language) {
    const contentPanel = document.getElementById('contentPanel');
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    
    // Set content based on selected language
    switch(language) {
        case 'java':
            contentTitle.textContent = 'Java Roadmap';
            contentBody.innerHTML = `
                <div class="mermaid">
                    graph TD
                        A[Learn the Basics]

                        %% Left Branch
                        A --> B[Basic Syntax]
                        B --> C[Lifecycle of a Program]
                        C --> D[Data Types]
                        D --> E[Variables and Scopes]
                        E --> F[Type Casting]

                        %% Right Branch
                        A --> G[Strings and Methods]
                        G --> H[Math Operations]
                        H --> I[Arrays]
                        I --> J[Conditionals]
                        J --> K[Loops]
                        K --> L[Basics of OOP]

                        %% OOP Main
                        A --> M[Object Oriented Programming]

                        %% More about OOP
                        M --> O1[Object Lifecycle]
                        O1 --> O2[Inheritance]
                        O2 --> O3[Abstraction]
                        O3 --> O4[Method Chaining]
                        O4 --> O5[Encapsulation]
                        O5 --> O6[Interfaces]
                        O6 --> O7[Enums]
                        O7 --> O8[Record]
                        O8 --> O9[Method Overloading/Overriding]
                        O9 --> O10[Initializer Block]
                        O10 --> O11[Static vs Dynamic Binding]
                        O11 --> O12[Pass by Value / Pass by Reference]
                </div>
            `;
            if (window.mermaid) {
                setTimeout(() => {
                    mermaid.init({ startOnLoad: true }, contentBody.querySelectorAll('.mermaid'));
                }, 100);
            }
            break;

        case 'python':
            contentTitle.textContent = 'Python Roadmap';
            contentBody.innerHTML = `
                <div class="mermaid">
                    graph TD
                        A[Learn the Basics]

                        %% Left Branch
                        A --> B[Syntax & Indentation]
                        B --> C[Data Types]
                        C --> D[Variables & Operators]
                        D --> E[Conditionals]
                        E --> F[Loops]

                        %% Right Branch
                        A --> G[Functions]
                        G --> H[Strings & Methods]
                        H --> I[Lists, Tuples, Sets]
                        I --> J[Dictionaries]
                        J --> K[Modules & Packages]

                        %% OOP
                        A --> M[Classes & Objects]
                        M --> N[Inheritance]
                        N --> O[Polymorphism]
                        O --> P[Encapsulation]
                </div>
            `;
            if (window.mermaid) {
                requestAnimationFrame(() => {
                    mermaid.init(undefined, contentBody.querySelectorAll('.mermaid'));
                });
            }
            break;

        case 'cpp':
            contentTitle.textContent = 'C++ Roadmap';
            contentBody.innerHTML = `
                <div class="mermaid">
                    graph TD
                        A["Learn the Basics"]

                        %% Left Branch
                        A --> B["Syntax & Structure"]
                        B --> C["Data Types"]
                        C --> D["Variables & Constants"]
                        D --> E["Operators"]
                        E --> F["Control Flow"]
                        F --> G["Loops"]

                        %% Right Branch
                        A --> H["Functions"]
                        H --> I["Arrays & Strings"]
                        I --> J["Pointers"]
                        J --> K["References"]
                        K --> L["Dynamic Memory"]

                        %% OOP
                        A --> M["Classes & Objects"]
                        M --> N["Constructors & Destructors"]
                        N --> O["Inheritance"]
                        O --> P["Polymorphism"]
                        P --> Q["Encapsulation & Abstraction"]

                        %% Advanced
                        A --> R["Templates"]
                        R --> S["STL (Standard Template Library)"]
                        S --> T["File Handling"]
                        T --> U["Multithreading"]
                </div>
            `;
            if (window.mermaid) {
                requestAnimationFrame(() => {
                    mermaid.init(undefined, contentBody.querySelectorAll('.mermaid'));
                });
            }
            break;

        case 'javascript':
            contentTitle.textContent = 'JavaScript Roadmap';
            contentBody.innerHTML = `
                <div class="mermaid">
                    graph TD
                        A["Learn the Basics"]

                        %% Left Branch
                        A --> B["Syntax and Fundamentals"]
                        B --> C["Variables (var let const)"]
                        C --> D["Data Types"]
                        D --> E["Operators"]
                        E --> F["Conditionals"]
                        F --> G["Loops"]

                        %% Right Branch
                        A --> H["Functions"]
                        H --> I["Arrays"]
                        I --> J["Objects"]
                        J --> K["Strings and Methods"]
                        K --> L["DOM Manipulation"]

                        %% Advanced JS
                        A --> M["ES6 and Later Features"]
                        M --> N["Modules Import Export"]
                        N --> O["Asynchronous JS - Callbacks Promises Async Await"]
                        O --> P["Error Handling"]

                        %% OOP in JS
                        A --> Q["OOP in JavaScript"]
                        Q --> R["Classes and Objects"]
                        R --> S["Inheritance"]
                        S --> T["Encapsulation"]
                        T --> U["Polymorphism"]

                        %% Extras
                        A --> V["Event Handling"]
                        V --> W["Fetch API and AJAX"]
                        W --> X["JSON Handling"]
                </div>
            `;
            if (window.mermaid) {
                requestAnimationFrame(() => {
                    mermaid.init(undefined, contentBody.querySelectorAll('.mermaid'));
                });
            }
            break;
    }
    
    // Show the content panel
    contentPanel.style.display = 'block';
    
    // Scroll to the content panel
    contentPanel.scrollIntoView({ behavior: 'smooth' });
}

function hideContent() {
    document.getElementById('contentPanel').style.display = 'none';
}

// Close content panel when clicking outside of it
document.addEventListener('click', function(event) {
    const contentPanel = document.getElementById('contentPanel');
    if (contentPanel.style.display === 'block' && !contentPanel.contains(event.target)) {
        // Check if the click was not on any of the card buttons
        if (!event.target.classList.contains('card-button') && 
            !event.target.classList.contains('mobile-menu-button')) {
            hideContent();
        }
    }
});