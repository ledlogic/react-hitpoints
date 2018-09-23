'use strict';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {con: 10, levels: {}};
    this.handleChange = this.handleChange.bind(this);
  }

  isLevelFavored(level) {
    return !!this.state.levels[level];
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
    var c = {};
    c[stat] = value;
    this.setState(c);
  }

  doChangeLevelFavored(level, state) {
    //console.log(this.state.levels[level])
    var levels = this.state.levels;
    levels[level] = state;
    //console.log(this.state.levels[level])
    var c = {};
    c.levels = levels;
    this.setState(c);
  }

// class events

  handleChange(e) {
    var t = e.target;
    const stat = t.id;

    switch (stat) {
      case "con":
        this.doChangeStat(t);
        break;

      default: ;
    }
  }

  handleLevelClick(e) {
    var t = e.target;
    var level = t.getAttribute("data-level");
    var state = t.checked;
    this.doChangeLevelFavored(level, state);
  }

  render() {
    var levelRows = [];
    var maxLevel = 20;
    var base = 10;
    var con = this.modifier("con");
    var avg = Math.ceil((base / 2) + 1);
    var totalFavored = 0;
    for (var level = 1; level < maxLevel; level++) {
      if (this.isLevelFavored(level)) {
        totalFavored++;
      }
      var hitpoints = (base + con) + (level - 1) * (avg + con) + totalFavored;
      levelRows.push(
          <tr>
            <td>{level}:</td>
            <td><input type="checkbox" name="favored" data-level={level} className="level-favored" checked={this.isLevelFavored(level)} onChange={this.handleLevelClick.bind(this)} /></td>
            <td>{hitpoints}</td>
          </tr>);
    }

    return (
      <div>
        <h3>Class</h3>
        <select id="characterClass" value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="fighter">Fighter</option>
        </select>

        <h3>Statistics</h3>
        <table id="statistics">
          <tbody>
            <tr>
              <td className="stat-label">
                CON
                <br/>
                <span className="stat-desc">Constitution</span>
              </td>
              <td><input type="number"   className="stat-value"    maxLength="2" id="con" name="con" value={this.state.con} onChange={this.handleChange.bind(this)}/></td>
              <td><input type="text"     className="stat-modifier" maxLength="3" name="con_modifier" value={this.signedValue(con)} onChange={this.handleChange.bind(this)}/></td>
            </tr>
          </tbody>
        </table>

        <h3>Levels</h3>
        <table id="levels">
          <thead>
            <tr>
              <th>Level</th>
              <th>Favored</th>
              <th>Hit Points</th>
            </tr>
          </thead>
          <tbody>
            {levelRows}
          </tbody>
        </table>

        <h3>Favored Class</h3>
        <p>
          Each character begins play with a single favored class of his choosing—typically, this is the same class as the one he chooses at 1st level. Whenever a character gains a level in his favored class, he receives either + 1 hit point or + 1 skill rank. The choice of favored class cannot be changed once the character is created, and the choice of gaining a hit point or a skill rank each time a character gains a level (including his first level) cannot be changed once made for a particular level. Prestige classes (see Prestige Classes) can never be a favored class.
        </p>
      </div>
    );
  }
}

const domContainer = document.querySelector('#character');
ReactDOM.render(<Character />, domContainer);
