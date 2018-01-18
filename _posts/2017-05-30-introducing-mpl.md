---
title:  "Introducing MPL: Matrix Processing Language"
date:   2017-05-30
categories: [Technical, Programming Languages]
tags: [PL, Columbia, OCaml]
---

![]({{ site.baseurl }}/images/mpl-logo.png){: .center-image}

I know. The name is pretty lame, because we had to come up with a name before we start the project and even learn anything about compilers and programming language design. In retrospect, I would have called it something like "Moore" or "Cell" (okay, probably not good names either :disappointed:).

MPL is a programming language that I, along with 3 other fellow classmates, designed and implemented for COMS 4115 - Programming languages and Translator. It is a Domain Specific Language (DSL), meaning it does not work for everything. Instead, MPL deals with matrices and images. We wanted it to be concise, cool, and reasonable to implement because this is a ~2-month course project.

We designed the language to be light-weight. Something like a scripting language using which we can quickly load images and run image processing operations on them. A simple example is blurring:

```c
int blur() {
    int sum;
    sum = #NW + 2*#N + #NE + 2*#W + 2*#E + #SW + 2*#S + #SE;
    sum = #C * 4 + sum;
    return sum / 16;
}

int main() {
    Mat img;
    int i = 0;
    pgmread("lena.pgm", img);
    while(i < 20) {
        blur @ img;
        i = i + 1;
    }
    pgmwrite("lena-out.pgm", img);
}
```
The program converts the image to the left to the one to the right, as shown here:

![]({{ site.baseurl }}/images/2017-05-30-introducing-mpl-73576.png){: .center-image}

The one line that does the trick is

```c
blur @ img;
```

We call `@` the __apply operator__, read as "apply to". This line "applies" the `blur` function on a matrix, which represents an image. The `blur` function is not a normal function you see in C and Java. Instead, like all other MPL functions, `blur` is an __entry function__, which can only be "applied" to a matrix.

It turns out that mathematically, the blurring procedure can be modeled as a "convolution" between a kernel and matrix. Inside of `blur` is essentially a kernel. See [here](http://setosa.io/ev/image-kernels/) for an excellent visual explanation.

In MPL, each entry function has access to its immediate neighbors. This might sound insufficient, but it turns out that local operations on small neighborhood can achieve a great deal! In MPL, we are using 8-neighborhood, also called [__Moore Neighborhood__](https://en.wikipedia.org/wiki/Moore_neighborhood) (hence the alternative name).

Of course, people have thought about this idea in PLT a long time ago and came up with syntax for convolution. In MPL, we generalized this idea to support conditionals, which is more than convolution (technically, not linear shift invariant).

One day a teammate showed me this epic video of Conway's game of life. I was amazed by the complexity of the scenes and also the simplicity of the game itself.

<iframe width="560" height="315" src="https://www.youtube.com/embed/C2vgICfQawE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

This turned out to be the final demo. We did a glider gun, which regularly shoots out "gliders". We resolved edges by wrap-around. That's why you see the gliders come back to destroy the gun.

![]({{ site.baseurl }}/images/gun.gif){: .center-image}

Here is a spaceship that we simulated (this thing is quite huge, the console can't keep up with the refresh rate all the time :grin:):

![]({{ site.baseurl }}/images/ship.gif){: .center-image}

The language is far from complete due to the time limit and the fact that I was taking OS at the same time (maybe I'll talk about the pain and gain in that class later). I still like it a lot because we built a complete compiler from scratch, which turned out to be an extremely fun process, and we got some visually pleasing results at the end.
