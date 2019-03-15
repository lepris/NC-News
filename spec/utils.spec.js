const { expect } = require('chai');
const { convertDates, articleRef, commentRefined } = require('../db/utils/dateConversion.js');

// console.log(convertDate, articleRef);

describe('Check utlitiry function for date conversion', () => {
  it('it takes the correct value', () => {
    const result = convertDates([{
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    }]);
    expect(result[0].created_at.toString()).to.eql('Wed Nov 17 2010 12:21:54 GMT+0000 (GMT)');
  });
});

describe('create article reference object with id and title', () => {
  it('takes returned articles and makes ', () => {
    const result = articleRef([{
      article_id: 1,
      title: 'Running a Node App',
      body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      votes: 0,
      topic: 'coding',
      author: 'jessjelly',
      created_at: '2016-08-18',
    }]);
    expect(result).to.eql({
      'Running a Node App': 1,
    });
  });
});

describe('commentRefined - utility', () => {
  it('Converts comment data using article_id instead of belongs to', () => {
    const data = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: 'Running a Node App',
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];

    const keyObj = {
      'Running a Node App': 1,
    };

    expect(commentRefined(keyObj, data)).to.be.eql([{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }]);
  });
});
