// Global state
let allCompanies = [];
let currentCompany = null;
let currentPeriod = '1';
let currentProblems = [];
let filteredProblems = [];
let currentDifficulty = 'ALL';
let sortConfig = { column: null, ascending: true };

// Period mapping
const periodMapping = {
    '1': '1. Thirty Days.csv',
    '2': '2. Three Months.csv',
    '3': '3. Six Months.csv',
    '4': '4. More Than Six Months.csv',
    '5': '5. All.csv'
};

// Initialize the application
async function init() {
    try {
        await loadCompanies();
        setupEventListeners();
        displayCompanies(allCompanies);
        document.getElementById('totalCompanies').textContent = allCompanies.length;
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
}

// Load list of companies from the directory structure
async function loadCompanies() {
    try {
        // First try to load from local companies.json file
        const response = await fetch('companies.json');
        if (response.ok) {
            allCompanies = await response.json();
            return;
        }
    } catch (error) {
        console.log('Local companies.json not available, trying GitHub API...');
    }

    try {
        // Fallback to GitHub API
        const response = await fetch('https://api.github.com/repos/jitendra-789/leetcode-company-wise-problems/contents/');
        const data = await response.json();
        
        allCompanies = data
            .filter(item => item.type === 'dir')
            .map(item => item.name)
            .sort();
    } catch (error) {
        console.error('Error loading companies:', error);
        allCompanies = [];
    }
}

// Display companies in the sidebar
function displayCompanies(companies) {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = '';

    companies.forEach(company => {
        const div = document.createElement('div');
        div.className = 'company-item';
        div.textContent = company;
        div.onclick = () => selectCompany(company);
        companyList.appendChild(div);
    });
}

// Select a company and load its problems
async function selectCompany(company) {
    currentCompany = company;
    
    // Update UI
    document.querySelectorAll('.company-item').forEach(item => {
        item.classList.toggle('active', item.textContent === company);
    });

    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('problemsScreen').style.display = 'block';
    document.getElementById('selectedCompany').textContent = company;

    // Reset to default period and difficulty
    currentPeriod = '1';
    currentDifficulty = 'ALL';
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === '1');
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === 'ALL');
    });

    await loadProblems();
}

// Load problems for the current company and period
async function loadProblems() {
    const fileName = periodMapping[currentPeriod];
    const csvPath = `${currentCompany}/${fileName}`;

    try {
        // Show loading state
        document.getElementById('problemsTableBody').innerHTML = '<tr><td colspan="6" class="loading">Loading problems</td></tr>';

        let response;
        let csvText;
        
        // Try loading from local path first (for when served from the repository)
        try {
            response = await fetch(csvPath);
            if (response.ok) {
                csvText = await response.text();
            }
        } catch (e) {
            console.log('Local fetch failed, trying GitHub raw...');
        }

        // Fallback to GitHub raw content
        if (!csvText) {
            response = await fetch(`https://raw.githubusercontent.com/jitendra-789/leetcode-company-wise-problems/main/${encodeURIComponent(csvPath)}`);
            if (!response.ok) throw new Error('Failed to load CSV');
            csvText = await response.text();
        }

        currentProblems = parseCSV(csvText);
        filteredProblems = [...currentProblems];
        
        applyFilters();
        displayProblems();
    } catch (error) {
        console.error('Error loading problems:', error);
        document.getElementById('problemsTableBody').innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #ef4444;">Failed to load problems. Please try again.</td></tr>';
    }
}

// Parse CSV text into array of objects
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const problems = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Handle quoted fields properly
        const fields = [];
        let currentField = '';
        let insideQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                fields.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        fields.push(currentField.trim()); // Add the last field

        if (fields.length >= 6) {
            problems.push({
                difficulty: fields[0],
                title: fields[1],
                frequency: parseFloat(fields[2]) || 0,
                acceptance: parseFloat(fields[3]) || 0,
                link: fields[4],
                topics: fields[5]
            });
        }
    }

    return problems;
}

// Apply filters to the problems list
function applyFilters() {
    filteredProblems = currentProblems.filter(problem => {
        // Difficulty filter
        if (currentDifficulty !== 'ALL' && problem.difficulty !== currentDifficulty) {
            return false;
        }

        // Search filter
        const searchTerm = document.getElementById('problemSearch').value.toLowerCase();
        if (searchTerm) {
            const searchable = `${problem.title} ${problem.topics}`.toLowerCase();
            if (!searchable.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });

    // Apply sorting if configured
    if (sortConfig.column) {
        sortProblems(sortConfig.column, sortConfig.ascending);
    }
}

// Sort problems by column
function sortProblems(column, ascending = true) {
    filteredProblems.sort((a, b) => {
        let aVal, bVal;

        switch (column) {
            case 'difficulty':
                const diffOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
                aVal = diffOrder[a.difficulty] || 0;
                bVal = diffOrder[b.difficulty] || 0;
                break;
            case 'title':
                aVal = a.title.toLowerCase();
                bVal = b.title.toLowerCase();
                break;
            case 'frequency':
                aVal = a.frequency;
                bVal = b.frequency;
                break;
            case 'acceptance':
                aVal = a.acceptance;
                bVal = b.acceptance;
                break;
            default:
                return 0;
        }

        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
}

// Display problems in the table
function displayProblems() {
    const tbody = document.getElementById('problemsTableBody');
    tbody.innerHTML = '';

    // Update info
    const info = document.getElementById('problemsInfo');
    info.textContent = `Showing ${filteredProblems.length} of ${currentProblems.length} problems`;

    if (filteredProblems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #64748b;">No problems found matching your filters.</td></tr>';
        return;
    }

    filteredProblems.forEach(problem => {
        const row = document.createElement('tr');
        
        // Difficulty
        const diffCell = document.createElement('td');
        diffCell.innerHTML = `<span class="difficulty-badge difficulty-${problem.difficulty}">${problem.difficulty}</span>`;
        row.appendChild(diffCell);

        // Title
        const titleCell = document.createElement('td');
        titleCell.textContent = problem.title;
        titleCell.style.fontWeight = '500';
        row.appendChild(titleCell);

        // Frequency
        const freqCell = document.createElement('td');
        freqCell.textContent = problem.frequency.toFixed(1);
        row.appendChild(freqCell);

        // Acceptance Rate
        const accCell = document.createElement('td');
        accCell.textContent = (problem.acceptance * 100).toFixed(1) + '%';
        row.appendChild(accCell);

        // Topics
        const topicsCell = document.createElement('td');
        const topics = problem.topics.split(',').map(t => t.trim());
        topics.forEach(topic => {
            const tag = document.createElement('span');
            tag.className = 'topic-tag';
            tag.textContent = topic;
            topicsCell.appendChild(tag);
        });
        row.appendChild(topicsCell);

        // Link
        const linkCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = problem.link;
        link.className = 'problem-link';
        link.textContent = 'Solve';
        link.target = '_blank';
        linkCell.appendChild(link);
        row.appendChild(linkCell);

        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Company search
    document.getElementById('companySearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allCompanies.filter(company => 
            company.toLowerCase().includes(searchTerm)
        );
        displayCompanies(filtered);
    });

    // Problem search
    document.getElementById('problemSearch').addEventListener('input', () => {
        applyFilters();
        displayProblems();
    });

    // Time period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            currentPeriod = btn.dataset.period;
            document.querySelectorAll('.period-btn').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');
            await loadProblems();
        });
    });

    // Difficulty filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentDifficulty = btn.dataset.difficulty;
            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');
            applyFilters();
            displayProblems();
        });
    });

    // Sortable table headers
    document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (sortConfig.column === column) {
                sortConfig.ascending = !sortConfig.ascending;
            } else {
                sortConfig.column = column;
                sortConfig.ascending = true;
            }
            applyFilters();
            displayProblems();
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
