import Component from "@glimmer/component";
import Category from "discourse/models/category";
import { i18n } from "discourse-i18n";

export default class Jeppseon extends Component {
  get jLogo() {
    console.log("jepp" , settings);
    return "loog.jpg";
  }
}
