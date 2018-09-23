'use strict';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {con: 10};
    this.handleChange = this.handleChange.bind(this);
  }

  modifier(statistic) {
    const stat = this.state[statistic];
    const mod = Math.floor((stat - 10) / 2);
    return mod;
  }

  signedValue(number) {
    return this.sign(number) + number;
  }

  sign(number) {
    return (number > 0) ? "+" : "";
  }

// character actions

  doChangeStat(t) {
    const stat = t.id;
    const value = parseInt(t.value, 10);
    console.log(["stat", stat]);
    console.log(["value", value]);
    var c = {};
    c[stat] = value;
    console.log(c);
    this.setState(c);
  }

// class events

  handleChange(e) {
    console.log(e);
    var t = e.target;
    const stat = t.id;

    switch (stat) {
      case "con":
        this.doChangeStat(t);
        break;

      default: ;
    }
  }

  render() {
    var levelRows = [];
    var maxLevel = 20;
    var con = this.modifier("con");
    var avg = (10 + 1) / 2;
    for (var level = 1; level < maxLevel; level++) {
      var hitpoints = Math.floor(10 + (level - 1) * avg + con);
      levelRows.push(
          <tr>
            <td>{level}:</td>
            <td>{hitpoints}</td>
          </tr>);
    }

    return (
      <div>
        <h3>Class</h3>
        <select id="characterClass" value={this.state.value} onChange={this.handleChange}>
          <option value="bard">Bard</option>
          <option value="fighter">Fighter</option>
          <option value="sorcerer">Sorcerer</option>
        </select>

        <h3>Statistics</h3>
        <table id="statistics">
          <tbody>
            <tr>
              <td>CON</td>
              <td><input type="number" className="statistic" maxLength="2" id="con" name="con" value={this.state.con} onChange={this.handleChange.bind(this)}/></td>
              <td><input type="text" className="modifier" maxLength="3" name="con_modifier" value={this.signedValue(con)} onChange={this.handleChange.bind(this)}/></td>
            </tr>
          </tbody>
        </table>

        <h3>Levels</h3>
        <table id="levels">
          <thead>
            <tr>
              <th>Level</th>
              <th>Hit Points</th>
            </tr>
          </thead>
          <tbody>
            {levelRows}
          </tbody>
        </table>
      </div>
    );
  }
}

const domContainer = document.querySelector('#character');
ReactDOM.render(<Character />, domContainer);
