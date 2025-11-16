---
title: "Let's Rank Numbers With Mama"
date: 2025-06-26 01:04
layout: '@layouts/Blog.astro'
---

For fun, and also to practice some web-dev stuff, I made a website to rank
numbers from 1-100. Yum!

<!--more-->

If you're seeing this you're likely from Tumblr, where I conducted this
experiment, but if you're not somehow, I'll explain. I had a website open for
about 3 days which showed people two random numbers, and asked them to pick a
favourite number out of them. You could do this however many times, and I
recorded all the answers in order to rank them. If you want the results, too
bad. Read through everything first. Or scroll all the way to the bottom okay
I'm not your dad.

This was very much inspired by Tom Scott's ["What Is The Best
Thing?"](https://www.youtube.com/watch?v=ALy6e7GbDRQ) experiment, and also
TomSka's ["What is the best asdfmovie
joke?"](https://www.youtube.com/watch?v=Kfhdp5U_J-E) video which follows the
same method of polling.

I had an idea to do a type of poll like this for a long time, but I needed a
prototype first. This site is statically hosted, meaning I cant store any data
on it. It wasn't too hard to get around, I just stole access to my [friend
Lise's](https://wii.gay) server box, which I used to host the backend for this
project.

### Bunch of stuff sucked

First mistake, I should have hosted both the backend _and_ frontend for it on
the same server. When I published it I quickly noticed it didn't work for
anyone using a chromium-based browser. The site used a cookie to communicate to
the server "this is the person who I gave these two numbers to."

Because the backend was on a different server on a different domain, Chrome (as
it should) doesn't allow setting the cookie based on the "SameSite" Set-Cookie
header. I fixed it by setting SameSite to "None" letting the browser set the
cookie for the frontend from the other server.

I'm suprised it worked on Firefox! That's actually probably something that
should get looked into. There were other solutions which were better and more
secure but it was quick and it didn't need much security. It's numbers.

The next mistake I made was how I stored the data. I had 3 columns, an ID, who
won, and who lost. I stored the data with sqlite and the query I needed to get
a good overview of the data was stupidly long and I really felt like it could
have been easier. Not sure what the better solution would be, I asked and
someone said it would be easier to store two entries for each matchup, just
saying who was in it, and if they won or not. Much easier but has twice as many
rows and a lot of redundant data, so idk.

Third mistake was using JavaScript. For context, I hosted the backend with php
because it was easy to make a "session". I mentioned it earlier, so the server
knows which two options they picked from, so someone couldn't easily write a
script to send a bunch of votes for their favourite number, against their least
favourite.

I used JavaScript on the frontend to get and send the data from the server and
display the site, but it made a bunch of issues that wouldn't have existed if I
used php for the whole damn site. Forms can just directly submit to php!
Unfortunate.

Anyway, I learned a lot from this. Yay!

### Stop scrolling here's numbers

The numbers are ranked by the percent of matches they won.

With 2619 votes, each number should have showed up in 52 matches. 58 was in the
lowest number of matches, only in 37, and the highest was 49, which was in 73.

### Okay okay for real here's numbers:

The number which did the worst was 79, winning only 27% of the time. The rest
of the bottom five is 47, 29, 61, and 41. Pretty unremarkable numbers! JUST
KIDDING! THEY'RE ALL PRIME!

Still staying low, other primes appear, 43, 53, 17, 59, they're mostly ranked
really low! There's only 25 prime numbers in 1&#8288;&#8211;&#8288;100, and ten
of those appear in the bottom 15. That's really interesting!

I don't think most people who voted knew all these numbers were prime
consciously, just maybe intuitively knowing a bit based on seeing these numbers
used all their life. I think the quality of being indivisible just kinda
frustrates people, which is probably why there's so much Tumblr discourse.

The most controversial numbers are 44, and 62, both getting an equal amount of
votes and passes. Not much to say here, pretty average numbers clearly.

Though the repdigit numbers (11, 22, 33, etc.) are a little interesting. The
lowest ranked was actually 44, I can't really see why, but I guess it means all
of them are liked? Third place out of these was 88 though, get real.

### OKAY. Okay, here's the top 10

<!-- Why write anything in markdown when you're gonna have to write it in html
anyway because it can't fucking do reversed lists-->

<ol reversed>
<li>
    9. Wow the way I'm writing this is confusing. Anyway, 3 missed out on the
    top ten just barely at place 11, but its square makes it! I think 9 is
    still a good choice for a single digit number.
</li>

<li>
    42. The answer to life, the universe, and everything. Douglas Adams said he
    picked the number as a joke, fun fact. Idk, I haven't read Hitchhiker's.
</li>

<li>
    98. Actually not sure about this one! It's one of the top numbers in the
    double digits, so it's one of the top numbers on this list!
</li>

<li>
    24. Beautiful number all around. Two dozen, highly composite, number of
    hours in a day, just. Mwah. Apparently associated with being gay in Brazil.
    Cool! Or maybe it's derogatory. I know someone I can ask about this but
    it's 1AM or later there rn.
</li>

<li>
    13. An unlucky number! It recently was Friday the 13th as well. I think
    it's so high not because it's a good number, but because it's an
    interesting number. It's also a good number. You ever notice we have a
    proper name for 11 and 12, but 13 is just "three-ten" (thir-teen)?
</li>

<li>
    69. Obligatory "Nice."
</li>

<li>
    1. Number 1 wasn't! I mean I'm still glad it's up this high. What would
    numbers be without one. What is any other number if not many ones. I guess
    "not a positive integer". Makes me wonder where 0 would be if I included
    it.
</li>

<li>
    100. The big one… It's the largest one on the list, only one with 3 digits.
    Gotta love a one with a bunch of zeroes.
</li>

<li>
    64. Another beautiful number! It's a power of two, perfect for computers to
    work with. Almost every computer is 64 bit, it's a perfect number to keep
    dividing into 2, it's a Minecraft stack, it's the Nintendo 64, it's
    everywhere! So what beats it?
</li>

<li>
   99. I was suprised! I think while 100 is really large, 99 feels more…
   powerful? You think of a big number it's 999999999, it's like a maxed out
   counter. It's the biggest it can get before rolling over. It really
   catches your eye, which I think it's why it did so well.
</li>
</ol>

What did we learn? Not much. You guys need to be nicer to prime numbers though.

Here's a table with all the results!

|Place|Number|Wins|Losses|% Won|
|--:|--:|-:|-:|---:|
|  1| 99|35| 9|79.5|
|  2| 64|47|15|75.8|
|  3|100|39|13|75.0|
|  4|  1|31|12|72.1|
|  5| 69|33|13|71.7|
|  6| 13|38|17|69.1|
|  7| 24|37|18|67.3|
|  8| 98|36|18|66.7|
|  9| 42|34|17|66.7|
| 10|  9|37|19|66.1|
| 11|  3|36|19|65.5|
| 12| 66|31|17|64.6|
| 13| 80|34|19|64.2|
| 14| 96|24|14|63.2|
| 15| 36|35|21|62.5|
| 16| 18|25|15|62.5|
| 17| 72|28|17|62.2|
| 18| 88|34|21|61.8|
| 19| 22|32|20|61.5|
| 20| 25|30|19|61.2|
| 21| 40|37|24|60.7|
| 22|  4|35|23|60.3|
| 23| 49|44|29|60.3|
| 24|  2|27|18|60.0|
| 25| 10|31|21|59.6|
| 26|  6|31|21|59.6|
| 27| 16|29|20|59.2|
| 28|  8|33|23|58.9|
| 29| 77|34|24|58.6|
| 30| 20|29|21|58.0|
| 31| 34|35|26|57.4|
| 32| 95|33|25|56.9|
| 33| 30|33|25|56.9|
| 34| 50|25|19|56.8|
| 35| 35|27|21|56.2|
| 36| 33|27|21|56.2|
| 37| 32|29|23|55.8|
| 38| 60|32|26|55.2|
| 39| 84|31|26|54.4|
| 40| 51|27|23|54.0|
| 41|  7|24|21|53.3|
| 42| 15|22|20|52.4|
| 43| 81|23|21|52.3|
| 44| 21|36|33|52.2|
| 45| 45|27|25|51.9|
| 46| 74|29|27|51.8|
| 47| 11|32|30|51.6|
| 48| 90|24|23|51.1|
| 49| 75|25|24|51.0|
| 50| 12|26|25|51.0|
| 51| 71|27|26|50.9|
| 52| 55|30|29|50.8|
| 53| 62|22|22|50.0|
| 54| 44|33|33|50.0|
| 55| 70|26|28|48.1|
| 56| 48|28|31|47.5|
| 57| 27|28|31|47.5|
| 58| 92|20|23|46.5|
| 59| 65|25|29|46.3|
| 60| 94|26|31|45.6|
| 61| 93|24|30|44.4|
| 62| 85|20|25|44.4|
| 63| 87|23|29|44.2|
| 64| 28|26|33|44.1|
| 65| 82|20|26|43.5|
| 66| 52|23|30|43.4|
| 67| 68|22|29|43.1|
| 68| 73|18|24|42.9|
| 69| 63|21|28|42.9|
| 70| 56|27|37|42.2|
| 71| 37|27|37|42.2|
| 72| 26|26|36|41.9|
| 73| 83|18|25|41.9|
| 74|  5|20|28|41.7|
| 75| 76|22|32|40.7|
| 76| 19|24|35|40.7|
| 77| 97|21|31|40.4|
| 78| 39|22|33|40.0|
| 79| 23|20|30|40.0|
| 80| 91|21|32|39.6|
| 81| 46|19|29|39.6|
| 82| 54|22|34|39.3|
| 83| 89|18|29|38.3|
| 84| 38|17|29|37.0|
| 85| 67|18|31|36.7|
| 86| 57|22|38|36.7|
| 87| 31|16|30|34.8|
| 88| 59|19|36|34.5|
| 89| 86|19|38|33.3|
| 90| 14|20|42|32.3|
| 91| 17|15|32|31.9|
| 92| 78|19|41|31.7|
| 93| 53|19|41|31.7|
| 94| 43|13|29|31.0|
| 95| 58|11|26|29.7|
| 96| 41|13|32|28.9|
| 97| 61|15|39|27.8|
| 98| 29|13|34|27.7|
| 99| 47|11|29|27.5|
|100| 79|17|46|27.0|
