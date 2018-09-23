'use strict';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {con: 10};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e);
    var t = e.target;
    const stat = t.id;
    const value = parseInt(t.value, 10);
    console.log(["stat", stat]);
    console.log(["value", value]);
    var c = {};
    c[stat] = value;
    console.log(c);
    this.setState(c);
  }

  modifier(statistic) {
    const stat = this.state[statistic];
    const mod = Math.floor((stat - 10) / 2);
    return this.sign(mod) + mod;
  }

  sign(number) {
    return (number > 0) ? "+" : "";
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>CON</td>
            <td><input type="number" className="statistic" maxLength="2" id="con" name="con" value={this.state.con} onChange={this.handleChange.bind(this)}/></td>
            <td><input type="text" className="modifier" maxLength="3" name="con_modifier" value={this.modifier("con")} onChange={this.handleChange.bind(this)}/></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector('#character');
ReactDOM.render(<Character />, domContainer);
