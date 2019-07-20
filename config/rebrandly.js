const fetch = require('node-fetch');

class Rebrandly {
  constructor(apikey) {
    this.url = 'https://api.rebrandly.com/v1/';
    this.headers = {
      "Content-Type": "application/json",
      "apikey": apikey,
    }
  }

  async listLinks() {
    try {
      let res = await fetch(this.url + 'links', {
        method: 'GET',
        headers: this.headers
      });

      let json = await res.json();
      if (res.ok) {
        return {ok: true, links: json}
      } else return {ok: false, type: 'rebrandly', error: json}

      return json;
    } catch(err) {
      console.error(err);
      return {ok: false, type: 'node', error: err}
    }
  }

  async getLink(slashtag) {
    try {
      let { ok, links, type, error } = await this.listLinks();
      links = links ? links : [];

      if (ok) {
        let link = links.find(link => link.slashtag === slashtag);
        return {ok: true, res: link}
      } else return {ok: false, type, error}
    } catch(err) {
      console.error(err);
      return {ok: false, type: 'node', error: err}
    }
  }

  async createLink(link, title) {
    try {
      let data = {}
      data.destination = link;
      data.title = title ? title : null;

      let res = await fetch(this.url + 'links', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      let json = await res.json();

      if (res.ok) {
        return {ok: true, res: json}
      } else return {ok: false, type: 'rebrandly', error: json}
    } catch(err) {
      console.error(err);
      return {ok: false, type: 'node', error: err}
    }
  }

  async deleteLink(slashtag) {
    try {
      let links = await this.listLinks();
      let link = links.find(link => link.slashtag === slashtag);
      let res = await fetch(this.url + `links/${link.id}`, {
        method: 'DELETE',
        headers: this.headers
      });

      let json = await res.json();

      if (res.ok) {
        return {ok: true, res: json}
      } else return {ok: false, type: 'rebrandly', error: json}
    } catch(err) {
      console.log(err);
      return {ok: false, type: 'node', error: err}
    }
  }
}

module.exports = Rebrandly;
