import './index.css';

function App() {
  return (
    <div className="iphone-calculator">
      <div className="header">
        <div className="time">3:32</div>
        <div className="status-icons">
          <img src="./../status.png" alt="Status Icons" className="status-image" />
        </div>
      </div>

      <div className="calculator">
        <div className="display">0</div>
        <div className="buttons">
          <div className="row">
            <button className="button function">AC</button>
            <button className="button function">+/-</button>
            <button className="button function">%</button>
            <button className="button operator">÷</button>
          </div>
          <div className="row">
            <button className="button number">7</button>
            <button className="button number">8</button>
            <button className="button number">9</button>
            <button className="button operator">×</button>
          </div>
          <div className="row">
            <button className="button number">4</button>
            <button className="button number">5</button>
            <button className="button number">6</button>
            <button className="button operator">−</button>
          </div>
          <div className="row">
            <button className="button number">1</button>
            <button className="button number">2</button>
            <button className="button number">3</button>
            <button className="button operator">+</button>
          </div>
          <div className="row">
            <button className="button number zero">0</button>
            <button className="button number">.</button>
            <button className="button operator">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
