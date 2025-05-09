import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { ajax } from "discourse/lib/ajax";
import { i18n } from "discourse-i18n";

export default class TopContributors extends Component {
  @tracked topContributors = null;
  order = this.args.params?.order || "likes_received";
  period = this.args.params?.period || "yearly";
  count = this.args.params?.count || 5;
  excludedGroupNames = this.args.params?.excludedGroupNames || "";

  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args?.params?.title || i18n(themePrefix("top_contributors.heading"));

    ajax(this.requestURL).then((data) => {
      this.topContributors = data.directory_items?.slice(0, this.count);
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.topContributors = null;
  }

  get requestURL() {
    return `/directory_items.json?period=${this.period}&order=${this.order}&exclude_groups=${this.excludedGroupNames}&limit=${this.count}`;
  }

  get viewAllUrl() {
    return `/u?order=${this.order}&period=${this.period}&exclude_groups=${this.excludedGroupNames}`;
  }
}
