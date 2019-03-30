import React, { Component } from 'react';
import CandleStickStockScaleChart from './components/CandleStickChart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      normal: {},
      week: {}
    };
  }
  componentDidMount() {
    this.getData('', 'normal');
    this.getData('WEEK_1', 'week');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {this.state.normal.length > 0 &&
            <div> normal Chart
              <CandleStickStockScaleChart
                data={this.state.normal}
                width={800}
                ratio={1}
              />
            </div> }


            {this.state.week.length > 0 &&
              <div> week Chart
              <CandleStickStockScaleChart
              data={this.state.week}
              width={800}
              ratio={1}
              />
              </div>
            }
        </header>
      </div>
    );
  }

  getData(time = '', chartType = '') {
    fetch(`https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${time}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        const cleanJson = myJson.map((data) => {
          data.date = new Date(data.date);
          return data;
        });
        this.setState({
          [chartType] : cleanJson
        });
      }.bind(this));
  }
}

export default App;
