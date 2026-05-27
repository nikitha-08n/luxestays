const fs = require('fs');
let css = fs.readFileSync('src/index.css');

let str = css.toString('utf8');

// Find where the corruption started, or where the valid old CSS ended.
// The bad powershell >> inserted null bytes between letters of "/* NoBroker style Property Card */"
// In UTF-8, this will look like "/*\x00 \x00N\x00o\x00B\x00r\x00o\x00k\x00e\x00r" or similar.
let badStart = str.indexOf('/*\x00 \x00N\x00o\x00B');
if (badStart !== -1) {
    str = str.substring(0, badStart);
} else {
    let goodStart = str.indexOf('/* NoBroker style Property Card */');
    if (goodStart !== -1) {
        str = str.substring(0, goodStart);
    }
}

const noBrokerCss = `
/* NoBroker style Property Card */
.nb-property-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    font-family: var(--font-sans);
    margin-bottom: 1.5rem;
    cursor: pointer;
    border: 1px solid #f0f0f0;
}

.nb-card-images {
    display: flex;
    height: 180px;
    gap: 2px;
}

.nb-main-img {
    flex: 2;
    background-size: cover;
    background-position: center;
    position: relative;
}

.nb-side-img {
    flex: 1;
    background-size: cover;
    background-position: center;
    position: relative;
}

.nb-badge {
    position: absolute;
    bottom: -12px;
    left: 12px;
    background: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 100px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 10;
}

.badge-posh { color: #eab308; }
.badge-negotiable { color: #22c55e; }

.nb-action-buttons {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.nb-icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: none;
    cursor: pointer;
}

.nb-card-content {
    padding: 1rem;
    padding-top: 1.5rem;
}

.nb-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.nb-title {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    line-height: 1.3;
    flex: 1;
    padding-right: 1rem;
    margin: 0;
}

.nb-price-block {
    text-align: right;
}

.nb-price {
    font-size: 1.1rem;
    font-weight: 800;
    color: #222;
}

.nb-maintenance {
    font-size: 0.7rem;
    color: #666;
}

.nb-location-row {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 1rem;
}

.nb-nearby-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.75rem;
    color: #888;
}

.nb-nearby-pill {
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #555;
}

.nb-specs-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0 1rem;
}

.nb-spec-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: #555;
    font-weight: 500;
}

.nb-footer-row {
    display: flex;
    gap: 1rem;
}

.nb-btn-notes {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #dcfce7;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
}

.nb-btn-contact {
    flex: 1;
    background: #f43f5e;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
`;

fs.writeFileSync('src/index.css', str + '\n' + noBrokerCss, 'utf8');
console.log('Fixed CSS');
