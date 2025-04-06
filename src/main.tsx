// Visit developers.reddit.com/docs to learn Devvit!
import './guts/share.js';
import { Devvit } from '@devvit/public-api';

import {createPost} from './guts/steps.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Hello World',
  forUserType: 'moderator',
  onPress: createPost,
});

Devvit.addCustomPostType({
  name: 'Hello-World',
  render: (context) => {

    /* Grabs the current user's username with the Reddit API Client &
    handles the case for logged out users. */
    const [username] = context.useState(async () => {
      const user = await context.reddit.getCurrentUser();
      return user?.username ?? 'user';
    });

    const [snoovatar] = context.useState(async () => {
      const snoovatarUrl = await context.reddit.getSnoovatarUrl(username);
      return snoovatarUrl ?? 'https://www.redditstatic.com/desktop2x/img/snoovatar-placeholder.png';
    });

    const bodyText = `Hi ${username}!`;
    const avatar = `${snoovatar}`;
    
    return (
      <vstack alignment='center middle' height='100%'>
        <text size='xxlarge' weight='bold'>
          {bodyText}
        </text>
        <image url = {avatar} imageWidth={100} imageHeight={100} />
      </vstack>
    );
  },
});

export default Devvit;
