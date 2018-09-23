'use strict';

class Character extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      con: 10,
      feats:{ toughness: false },
      favoredClassLevels: {},
      classIndex: 6,
      classes: [
        {
          name: "Alchemist",
          hitdie: "d8"
        },
        {
          name: "Arcanist",
          hitdie: "d6"
        },
        {
          name: "Barbarian",
          hitdie: "d12"
        },
        {
          name: "Bard",
          hitdie: "d8"
        },
        {
          name: "Bloodrager",
          hitdie: "d10"
        },
        {
          name: "Brawler",
          hitdie: "d10"
        },
        {
          name: "Cavalier",
          hitdie: "d10"
        },
        {
          name: "Cleric",
          hitdie: "d8"
        },
        {
          name: "Druid",
          hitdie: "d8"
        },
        {
          name: "Fighter",
          hitdie: "d10"
        },
        {
          name: "Gunslinger",
          hitdie: "d10"
        },
        {
          name: "Inquisitor",
          hitdie: "d8"
        },
        {
          name: "Investigator",
          hitdie: "d8"
        },
        {
          name: "Magus",
          hitdie: "d8"
        },
        {
          name: "Monk",
          hitdie: "d8"
        },
        {
          name: "Ninja",
          hitdie: "d8"
        },
        {
          name: "Oracle",
          hitdie: "d8"
        },
        {
          name: "Paladin",
          hitdie: "d10"
        },
        {
          name: "Ranger",
          hitdie: "d10"
        },
        {
          name: "Rogue",
          hitdie: "d8"
        },
        {
          name: "Samurai",
          hitdie: "d10"
        },
        {
          name: "Shaman",
          hitdie: "d8"
        },
        {
          name: "Slayer",
          hitdie: "d10"
        },
        {
          name: "Sorcerer",
          hitdie: "d6"
        },
        {
          name: "Summoner",
          hitdie: "d8"
        },
        {
          name: "Swashbuckler",
          hitdie: "d10"
        },
        {
          name: "Warpriest",
          hitdie: "d8"
        },
        {
          name: "Witch",
          hitdie: "d6"
        },
        {
          name: "Wizard",
          hitdie: "d6"
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

// our methods

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  hitdie() {
    const i = this.state.classIndex;
    const aClass = this.state.classes[i];
    const hitdie = aClass.hitdie;
    return hitdie;
  }

  isLevelFavored(level) {
    var cl = this.state.favoredClassLevels[level];
    var ret = typeof(cl) == "undefined" ? true : !!cl;
    return ret;
  }

  isSelectedClass(i) {
    return i == this.state.classIndex
  }

  isFeatEnabled(feat) {
    var ret = this.state.feats[feat];
    return ret;
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

  doChangeClass(t) {
    console.log(t);
    const i = t.selectedIndex;
    var c = {};
    c.classIndex = i;
    this.setState(c);
  }

  doChangeLevelFavored(level, state) {
    var levels = this.state.favoredClassLevels;
    levels[level] = state;
    var c = {};
    c.favoredClassLevels = levels;
    this.setState(c);
  }

  doChangeFeatEnabled(feat, state) {
    var feats = this.state.feats;
    feats[feat] = state;
    var c = {};
    c.feats = feats;
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

      case "characterClass":
        this.doChangeClass(t);
        break;

      default: ;
        break;
    }
  }

  handleLevelClick(e) {
    var t = e.target;
    var level = t.getAttribute("data-level");
    var state = t.checked;
    this.doChangeLevelFavored(level, state);
  }

  handleFeatClick(e) {
    var t = e.target;
    var feat = t.getAttribute("data-feat");
    var state = t.checked;
    this.doChangeFeatEnabled(feat, state);
  }

  render() {
    var levelRows = [];
    var maxLevel = 20;

// feats
    var featRows = [];
    for (var feat in this.state.feats) {
      featRows.push(
        <tr>
          <td>{this.capitalize(feat)}</td>
          <td><input type="checkbox" name={feat} data-feat={feat} className="feat" checked={this.isFeatEnabled({feat})} onChange={this.handleFeatClick.bind(this)} /></td>
        </tr>
      );
    }

// classes
    var classOptions = [];
    for (var i = 0; i < this.state.classes.length; i++) {
      var aClass = this.state.classes[i];
      classOptions.push(
        <option value={aClass.name} selected={this.isSelectedClass(i)}>{aClass.name}</option>
      )
    }

// hitpoints
    var base = parseInt(this.hitdie().substring(1),10);
    var con = this.modifier("con");
    var avg = Math.ceil((base / 2) + 1);
    var totalFavored = 0;
    var toughness = this.isFeatEnabled("toughness");
    var totalToughness = 0;
    if (toughness) {
      totalToughness += 3;
    }
    for (var level = 1; level < maxLevel; level++) {
      if (this.isLevelFavored(level)) {
        totalFavored++;
      }
      if (toughness && level >= 4) {
        totalToughness++;
      }
      var hitpoints = (base + con) + (level - 1) * (avg + con) + totalFavored + totalToughness;
      levelRows.push(
        <tr>
          <td>{level}:</td>
          <td><input type="checkbox" name="favored" data-level={level} className="level-favored" checked={this.isLevelFavored(level)} onChange={this.handleLevelClick.bind(this)} /></td>
          <td>{hitpoints}</td>
        </tr>
      );
    }

    return (
      <div>
        <h3>Class</h3>
        <select id="characterClass" onChange={this.handleChange.bind(this)}>
          {classOptions}
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

        <h3>Feats</h3>
        <table id="feats">
          <tbody>
            {featRows}
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

        <h3>Toughness</h3>
        <p>
          You have enhanced physical stamina.
          Benefit: You gain +3 hit points. For every Hit Die you possess beyond 3, you gain an additional +1 hit point. If you have more than 3 Hit Dice, you gain +1 hit points whenever you gain a Hit Die (such as when you gain a level).
        </p>
      </div>
    );
  }
}

const domContainer = document.querySelector('#character');
ReactDOM.render(<Character />, domContainer);
