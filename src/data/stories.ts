import fox from "@/assets/story-fox.jpg";
import moon from "@/assets/story-moon.jpg";
import cloud from "@/assets/story-cloud.jpg";
import turtle from "@/assets/story-turtle.jpg";
import bear from "@/assets/story-bear.jpg";
import inventor from "@/assets/story-inventor.jpg";
import potd from "@/assets/story-of-day.jpg";

export type Tint = "mint" | "peach" | "cream" | "gold" | "teal" | "coral";

export interface Story {
  slug: string;
  title: string;
  author: string;
  category: string;
  ageGroup: "3-5" | "4-7" | "5-8" | "6-9" | "7-10";
  level: 1 | 2 | 3 | 4;
  minutes: number;
  cover: string;
  tint: Tint;
  blurb: string;
  paragraphs: string[];
}

const make = (s: Omit<Story, "paragraphs"> & { paragraphs?: string[] }): Story => ({
  ...s,
  paragraphs: s.paragraphs ?? [
    `It was the kind of morning when even the trees seemed to be holding their breath. ${s.title} began the way most good stories do — with a small wish and a much bigger world.`,
    `"Today," whispered our friend, "I will be brave." The wind carried the words across the meadow and up into the soft hills, where the clouds repeated them back like a gentle promise.`,
    `Along the way there were puddles to leap, songs to invent, and at least one snail who insisted on a proper introduction. Each step felt heavier and lighter at once — heavier with all the new ideas, and lighter because of the friends gathered along the way.`,
    `When the sky began to turn the color of warm honey, our friend stopped to rest beneath a tall, kind tree. "I'm not the same as I was this morning," they thought. And that, of course, is exactly the point of an adventure.`,
    `Back home, the lanterns glowed and supper smelled of butter and stories. There would be more tomorrow — more wishes, more puddles, more brave little moments. But for tonight, this was a perfect place to put a bookmark.`,
    `And so, gently, the day folded itself up like a paper boat and floated off to sleep — leaving just enough room in your heart for one more story.`,
  ],
});

export const stories: Story[] = [
  make({ slug: "the-lantern-fox", title: "The Lantern Fox", author: "Iris Ashford", category: "Adventure",
    ageGroup: "5-8", level: 2, minutes: 7, cover: fox, tint: "mint",
    blurb: "On the longest night of the year, a little fox lights a lantern and walks into the snowy birch forest to find a friend." }),
  make({ slug: "paper-boat-to-the-moon", title: "Paper Boat to the Moon", author: "Noor Karim", category: "Bedtime",
    ageGroup: "4-7", level: 1, minutes: 5, cover: moon, tint: "peach",
    blurb: "A child in a yellow raincoat sets sail to deliver a wish all the way up to the moon." }),
  make({ slug: "the-flower-cloud", title: "The Flower Cloud", author: "June Park", category: "Kindness",
    ageGroup: "3-5", level: 1, minutes: 4, cover: cloud, tint: "cream",
    blurb: "A shy little cloud learns that the best way to make friends is to rain kindness on the world below." }),
  make({ slug: "turtle-among-the-stars", title: "Turtle Among the Stars", author: "Sam Okafor", category: "Science",
    ageGroup: "6-9", level: 3, minutes: 8, cover: turtle, tint: "teal",
    blurb: "Tomi the turtle borrows an astronaut's helmet and takes the slowest, most wonderful trip through space." }),
  make({ slug: "bear-bakes-a-pie", title: "Bear Bakes a Pie", author: "Luca Romano", category: "Family",
    ageGroup: "3-5", level: 1, minutes: 6, cover: bear, tint: "gold",
    blurb: "When everything goes wrong in Bear's cozy kitchen, the neighbors arrive with flour, jokes, and warm hugs." }),
  make({ slug: "mira-and-the-tin-robot", title: "Mira and the Tin Robot", author: "Elena Vasquez", category: "Imagination",
    ageGroup: "6-9", level: 3, minutes: 9, cover: inventor, tint: "coral",
    blurb: "Mira's tin robot won't say a word — until she invents a language only the two of them understand." }),
  make({ slug: "the-whale-who-carried-a-lighthouse", title: "The Whale Who Carried a Lighthouse", author: "Iris Ashford",
    category: "Adventure", ageGroup: "7-10", level: 4, minutes: 11, cover: potd, tint: "teal",
    blurb: "A gentle giant sails the cloud-sea each night to help lost sailors find their way back home." }),

  make({ slug: "the-girl-who-spoke-to-rain", title: "The Girl Who Spoke to Rain", author: "Mei Lin", category: "Nature",
    ageGroup: "5-8", level: 2, minutes: 7, cover: cloud, tint: "mint",
    blurb: "Hana discovers that every raindrop carries a tiny story from somewhere far away." }),
  make({ slug: "a-quiet-song-for-owls", title: "A Quiet Song for Owls", author: "Noor Karim", category: "Bedtime",
    ageGroup: "3-5", level: 1, minutes: 4, cover: moon, tint: "peach",
    blurb: "When the forest can't fall asleep, a small owl hums the softest lullaby of all." }),
  make({ slug: "the-button-that-wished", title: "The Button That Wished", author: "Elena Vasquez", category: "Magic",
    ageGroup: "4-7", level: 2, minutes: 6, cover: inventor, tint: "gold",
    blurb: "A loose button rolls under the bed and finds a kingdom of forgotten, hopeful little things." }),
  make({ slug: "tomi-and-the-tide-pool", title: "Tomi and the Tide Pool", author: "Sam Okafor", category: "Science",
    ageGroup: "5-8", level: 2, minutes: 8, cover: turtle, tint: "teal",
    blurb: "A turtle and a curious child discover a whole tiny ocean between two rocks." }),
  make({ slug: "the-bakery-at-the-end-of-the-street", title: "The Bakery at the End of the Street", author: "Luca Romano",
    category: "Family", ageGroup: "4-7", level: 2, minutes: 7, cover: bear, tint: "cream",
    blurb: "Every Saturday morning, a grandfather and grandchild bake bread shaped like the day they're having." }),
  make({ slug: "the-paper-dragon-parade", title: "The Paper Dragon Parade", author: "Mei Lin", category: "Adventure",
    ageGroup: "6-9", level: 3, minutes: 9, cover: fox, tint: "coral",
    blurb: "On the night of the lantern festival, the smallest paper dragon decides it wants to lead." }),
  make({ slug: "wren-and-the-listening-tree", title: "Wren and the Listening Tree", author: "June Park", category: "Kindness",
    ageGroup: "5-8", level: 2, minutes: 7, cover: cloud, tint: "mint",
    blurb: "An old oak collects every secret whispered into its bark — and gives back gentle advice." }),
  make({ slug: "the-inventor-who-forgot-mondays", title: "The Inventor Who Forgot Mondays", author: "Elena Vasquez",
    category: "Imagination", ageGroup: "7-10", level: 4, minutes: 10, cover: inventor, tint: "gold",
    blurb: "When Professor Plum invents a calendar with no Mondays, the whole town has to remember together." }),
  make({ slug: "moonlight-picnic", title: "Moonlight Picnic", author: "Noor Karim", category: "Bedtime",
    ageGroup: "3-5", level: 1, minutes: 5, cover: moon, tint: "peach",
    blurb: "A family of foxes lays out blankets under the silver light and counts the friendly stars." }),
  make({ slug: "the-snail-mail-detective", title: "The Snail Mail Detective", author: "Iris Ashford", category: "Adventure",
    ageGroup: "6-9", level: 3, minutes: 8, cover: turtle, tint: "teal",
    blurb: "Detective Pip the snail follows a trail of misplaced letters across the whole garden." }),
  make({ slug: "the-honey-thief", title: "The Honey Thief", author: "Luca Romano", category: "Family",
    ageGroup: "4-7", level: 2, minutes: 6, cover: bear, tint: "gold",
    blurb: "Someone has been sneaking spoonfuls of honey — and Bear is determined to find out who." }),
  make({ slug: "the-tiny-astronaut", title: "The Tiny Astronaut", author: "Sam Okafor", category: "Science",
    ageGroup: "5-8", level: 2, minutes: 7, cover: turtle, tint: "coral",
    blurb: "A young explorer builds a cardboard rocket and reports back from her own bedroom moon." }),
  make({ slug: "the-kindness-quilt", title: "The Kindness Quilt", author: "June Park", category: "Kindness",
    ageGroup: "4-7", level: 2, minutes: 6, cover: cloud, tint: "peach",
    blurb: "A village sews one square at a time until the warmest, brightest quilt covers the whole square." }),
  make({ slug: "midnight-library-of-mice", title: "Midnight Library of Mice", author: "Elena Vasquez", category: "Magic",
    ageGroup: "6-9", level: 3, minutes: 9, cover: inventor, tint: "mint",
    blurb: "After the lights go out, a hidden library opens — and the librarians all have whiskers." }),
];

export const categories = ["Adventure","Bedtime","Kindness","Science","Family","Imagination","Magic","Nature"] as const;
export const ageGroups = ["3-5","4-7","5-8","6-9","7-10"] as const;
export const levels = [1,2,3,4] as const;

export const getStory = (slug: string) => stories.find(s => s.slug === slug);
