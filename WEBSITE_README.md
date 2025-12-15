# LeetCode Company-Wise Problems Website

A clean, responsive web interface to browse and search through LeetCode problems organized by companies.

## Features

- 🏢 **470+ Companies** - Browse problems from major tech companies
- 📊 **Time-based Filters** - View problems from last 30 days, 3 months, 6 months, or all time
- 🎯 **Difficulty Filters** - Filter by Easy, Medium, or Hard difficulty
- 🔍 **Search Functionality** - Search for companies and problems
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🔗 **Direct Links** - Quick links to solve problems on LeetCode
- 📈 **Sortable Columns** - Sort by difficulty, frequency, or acceptance rate

## How to Use

### Option 1: GitHub Pages (Recommended)

The website can be hosted directly on GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch (usually `main`) as the source
4. Save and wait a few minutes
5. Access your site at: `https://jitendra-789.github.io/leetcode-company-wise-problems/`

### Option 2: Local Development

Run the website locally:

```bash
# Clone the repository
git clone https://github.com/jitendra-789/leetcode-company-wise-problems.git
cd leetcode-company-wise-problems

# Start a local server (using Python)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Open browser to http://localhost:8000
```

### Option 3: Deploy to Netlify/Vercel

1. Create an account on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Deploy with default settings (no build command needed)

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── companies.json      # List of all companies
└── [Company Folders]   # CSV files organized by company
    ├── 1. Thirty Days.csv
    ├── 2. Three Months.csv
    ├── 3. Six Months.csv
    ├── 4. More Than Six Months.csv
    └── 5. All.csv
```

## Features in Detail

### Company Selection
- Browse through 470+ companies in the sidebar
- Search for companies using the search bar
- Click on a company to view its problems

### Time Period Filters
- **30 Days**: Problems from the last month
- **3 Months**: Problems from the last quarter
- **6 Months**: Problems from the last half year
- **6+ Months**: Older problems
- **All Time**: Complete list of problems

### Problem Filters
- Filter by difficulty: Easy, Medium, Hard, or All
- Search problems by title or topic
- Sort by difficulty, title, frequency, or acceptance rate

### Problem Information
Each problem shows:
- Difficulty level with color-coded badges
- Problem title
- Frequency score
- Acceptance rate
- Related topics as tags
- Direct link to solve on LeetCode

## Technical Details

- **Pure Frontend**: No backend required, runs entirely in the browser
- **Data Source**: CSV files from the repository
- **API Usage**: Uses GitHub raw content for CSV files and GitHub API for company list
- **Responsive**: Mobile-first design with flexbox and CSS Grid
- **Performance**: Efficient client-side filtering and sorting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Companies not loading:**
- Check if `companies.json` exists in the root directory
- Ensure you have internet connection (for GitHub API fallback)
- Check browser console for errors

**CSV files not loading:**
- Verify the CSV file exists in the company folder
- Check the file naming convention matches the expected format
- Ensure CORS is properly configured if hosting elsewhere

**Styling issues:**
- Clear browser cache
- Ensure `styles.css` is in the same directory as `index.html`
- Check browser developer tools for CSS loading errors

## Contributing

To add new features or fix bugs:

1. Fork the repository
2. Create a feature branch
3. Make your changes to `index.html`, `styles.css`, or `script.js`
4. Test locally
5. Submit a pull request

## Data Updates

The CSV data is updated regularly. Last update: June 1, 2024

To regenerate `companies.json` after adding new companies:
```bash
ls -d */ | sed 's/\/$//' | jq -R -s 'split("\n") | map(select(length > 0))' > companies.json
```

## License

This project uses data from the LeetCode Company-Wise Problems repository.

## Credits

- Data source: [LeetCode Company-Wise Problems](https://github.com/jitendra-789/leetcode-company-wise-problems)
- Website design and implementation: Created for Amazon interview preparation
