// Visit developers.reddit.com/docs to learn Devvit!
import { Devvit } from '@devvit/public-api';
import {createPost} from './guts/steps.js';

// Configures the Reddit API
Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

// Creates a menu item to create a moderator post
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Hello World',
  forUserType: 'moderator',
  onPress: createPost,
});

// Creates a custom post and renders
Devvit.addCustomPostType({
  name: 'Hello-World',
  render: (context) => {

    /* Grabs the current user's username with the Reddit API Client &
    handles the case for logged out users. */
    const [username] = context.useState(async () => {
      const user = await context.reddit.getCurrentUser();
      return user?.username ?? 'user';
    });

    /* Grabs the current user's snoovatarURL with the Reddit API Client &
    handles the case for a logged out user. */
    const [snoovatar] = context.useState(async () => {
      const snoovatarUrl = await context.reddit.getSnoovatarUrl(username);
      return snoovatarUrl ?? 'https://www.redditstatic.com/desktop2x/img/snoovatar-placeholder.png';
    });

    // Creates the consant used in the visual template
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

// Cryptic place holder
export default Devvit;
