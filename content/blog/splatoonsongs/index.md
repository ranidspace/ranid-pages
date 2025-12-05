---
title: "Splatoon Song Poll Results"
date: 2025-10-04 01:04:00
lastmod: 2025-11-15
---

For fun I made an online voting poll thingie to let everyone rank all the songs
from Splatoon. Check my [previous blog post](/blog/numbers), for a bit of
information about how it worked, but here's the results according to 33094
matchups.

<!--more-->

Okay I lied more bullshit before the results. Here's what I did differently.
First, I stored each vote as two entries. It works much better and easier! I
kept the site about the same, though I improved it on the [Pokemon
Poll](https://vote.ranid.space), which is still running! (remember to edit this
when it's not!). The backend and frontend both run on the same server and
there's no JavaScript needed. Yay!

I wanted to make this into a video, but while this poll was running some shit
happened and I kinda lost interest in Splatoon entirely, so here's the boring
raw results.

This was a poll idea I've been wanting to do for ages and I finally got it done
so I'm glad it worked out so well. Thank you to everyone for voting :)

Also note to future self. Please make some way to convert CSV files into HTML
tables. This is currently being stored as a markdown table and it's dumb. But
[here's the raw CSV anyway]({{< resource src="songpoll.csv" >}})

<ins class="edit" datetime="2025-11-15">
  <p>2025-11-15 Update:<br>I made the stinky csv loader it sucks so bad but it
  works. I had to switch to using MDX but. yay.</p>
</ins>

{{< makecsv src=songpoll.csv alignright="Place,Wins,Losses,% Won" >}}
