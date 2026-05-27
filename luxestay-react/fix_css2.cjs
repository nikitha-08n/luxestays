const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the old NoBroker CSS block if it exists
let noBrokerStart = css.indexOf('/* NoBroker style Property Card */');
if (noBrokerStart !== -1) {
    css = css.substring(0, noBrokerStart);
}

const simpleCardCss = `
/* Simple Property Card */
.simple-property-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    cursor: pointer;
    border: 1px solid #eaeaea;
    transition: transform 0.2s, box-shadow 0.2s;
}

.simple-property-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.simple-card-img {
    height: 200px;
    position: relative;
    overflow: hidden;
}

.simple-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.simple-card-heart {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
}

.simple-card-price {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: #fff;
    padding: 4px 10px;
    border-radius: 100px;
    font-weight: 700;
    font-size: 0.95rem;
    color: #111;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.simple-card-content {
    padding: 1rem;
}

.simple-card-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.simple-card-location {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 1rem;
}

.simple-card-meta {
    display: flex;
    gap: 1rem;
    border-top: 1px solid #f0f0f0;
    padding-top: 0.75rem;
}

.simple-card-meta span {
    font-size: 0.8rem;
    color: #555;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
}
`;

fs.writeFileSync('src/index.css', css + '\n' + simpleCardCss, 'utf8');
console.log('Fixed CSS with Simple Card');
