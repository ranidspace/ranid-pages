---
title: "Guess who rewrote their entire website again"
date: 2025-12-05 00:23:00
---

This site used to be made complely manually, and then made in Jekyll, and then
most recently Astro, which while it was pretty good, made me want to absolutely
explode everything all the time. So I switched to Hugo and it's nicer.

<!--more-->

### Astro Hatred

I don't hate it. It's fun to seem more bothered by things than I am but here's
my issues.

#### The Astro file format

It's like a weird combination of HTML and JavaScript put together, and the
separation is not always clear. When things are in braces -> {} it feels like
it's the JavaScript type thing but then you can also include HTML inside of it
without any delimiters.

#### MDX

The weird MDX format is pretty good but had like no support and broke a lot of
what I did, I had to write special cases in my scripts to get around it. I had
to use MDX because despite markdown being the way to write new posts, you can't
use any of the fancy components you made inside of MDX, but you also nowhere
else. Also the next point.

#### Bad integration with JavaScript

I have an Atom feed for this blog, I put a lot of care into making it all nice.
When I add an Astro component into an MDX file I'm not able to use it at all
when rendering the markdown. I'm also unable to access the final rendered page,
so I have to manually process the markdown again with different settings and
everything. It's dumb. I couldn't get tables to appear in the feed it sucked
:(.

Also not integration with JavaScript but just. JavaScript in general. Nobody
noticed but the dates and times were slightly off because of timezone bullshit
when viewed on the blog page versus on the actual page of the post itself. I
didn't feel like fixing it so I just rewrote everything.

#### NPM

Honestly I've said enough. Holy shit why does nothing in NPM have any
documentation at all. It's all in JavaScript and it's just suck to deal with at
all.

### Hugo

I switched to Hugo basically on a whim. I think there might have been other
options but I really liked how it WASN'T node.js based, and I really like how
Go templating works. It reminds me of php which I've used in the past.

Just really solid and it ended up making a lot of the templates I made to
generate things like tables from CSV files or listing out projects a lot
easier. Anything I felt like I wanted to do I was able to, while I felt like I
often had to fight against Astro.

It also just by default did some things which I had to explicitly do in Astro,
like sorting things by date, generating "summaries" (just an excerpt from the
beginning) which I can use to make a "read more" button on the main blog page.

It was a bit weird getting used to the page "kinds" like there's "home",
"single", "taxonomy" and "term" and "section", but I ended up only using 3 of
them, and they were pretty neat even if I felt like I underused it, it's
definitely extensible to a larger more complex website.

Sometimes the distinction between template and a normal page is a bit odd, If
I'm making a template for a single page, what should go in the template and
what should actually go in the page? Not sure, but I felt like I worked it out
a bit.

### Semantics

Also I spent a bit of time redoing the HTML of this site for better semantics!
It's completely unnoticeable, but it's better for screen readers at least! I
cleaned up using different header elements just because I liked the size and
made them logically follow h1 -> h2 -> h3 etc (though this may be broken on the
atom feed. I added time, address, ins, hgroup, and article elements where they
were needed, and it all should be fully compliant with the HTML guidelines.

It's really fun actually because it becomes more like a puzzle. Which elements
should I use here, which elements are allowed inside this one, can I use this
one here? idk maybe I'm a bit not normal.

I also included alt text for more images, and found out it's actually better to
remove the alt text in some cases, for things like decorative images, like how
when you view my home page on desktop, it puts the logo of the social media
right next to the name. Since the name is right next to it, and it's just
decor, I set `alt=""` to tell screen readers to skip is and just to read out
the link to avoid repetition. Neat!

### I feel like I had another point to make but I forgot it so here's a meow

meow :3
