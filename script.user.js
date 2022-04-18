// ==UserScript==
// @name         NPC Tyranu Evavu
// @namespace    https://github.com/windupbird144/
// @version      0.1
// @description  Clone of world famous card game Tyranu Evavu 
// @author       github.com/windupbird144
// @include        https://neopetsclassic.com/gameroom/?game=tyranuevavu
// @include      https://neopetsclassic.com/gameroom/
// @grant        none
// @license      MIT
// ==/UserScript==
(()=>{var p=["clubs","diamonds","hearts","spades"];function G(){let e=[];for(let t=2;t<=14;t++)for(let n of p)e.push({face:n,value:t});return e}function j(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}function C(){let e=G();return j(e),{open:e.pop(),deck:e,move:1,status:0,lastGuess:null}}function T(e){return e.move-1}function H(e){return{...e,open:e.deck[0],deck:e.deck.slice(1),move:e.move+1}}function O(e){return{...e,status:1}}function W(e){return{...e,status:2}}function I(e,t){return e.value===t.value?0:e.value<t.value?-1:e.value>t.value?1:0}function S(e,t){let n=I(e.open,e.deck[0]),o=e;return n===0||n<0&&t===0||n>0&&t===1?e.deck.length===1?o=O(e):o=H(e):o=W(e),{...o,lastGuess:t}}window.location.pathname==="/gameroom/"&&document.querySelector("#center").insertAdjacentHTML("beforeend",'<center><a href="/gameroom/?game=tyranuevavu">Tyranu Evavu</a></center>');function U(e){function t(){if(e<10||e>20){if(e%10===1)return"st";if(e%10===2)return"nd";if(e%10===3)return"rd"}return"th"}return e+t()}var N="https://i.ibb.co/dLkT8hx/montage.gif",P="https://i.ibb.co/NL9khyL/back1.gif",R="https://i.ibb.co/5GM88gN/uga-jubjub.gif",Y="https://i.ibb.co/BBgTnk7/tyranu.gif",A="https://i.ibb.co/T4QnGjp/evavu.gif",w=70;function B(e){let t=e.value-2,n=p.indexOf(e.face);return(t*4+n)*w}function F(){let e,t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("img"),u=document.createElement("p"),i=document.createElement("p"),f=document.createElement("img"),c=document.createElement("img"),r=document.createElement("div"),v=document.createElement("p"),g=document.createElement("fieldset"),d=document.createElement("button");n.appendChild(o),n.appendChild(c),r.appendChild(v),r.appendChild(d),t.id="tyranu-evavu",t.dataset.status="run",f.src=R,i.innerText="Uhhg Uuuuuuhhhhgggg!",d.innerText="Try again",i.classList.add("scream"),r.classList.add("summary"),u.classList.add("move"),n.classList.add("cards");function x(){c.src=P,c.style.objectPosition="initial"}function h(s,a){a.width=w,a.height=90,a.src=N,a.style.objectPosition=`-${B(s)}px 0`,a.style.objectFit="none"}function L(s,a){a.innerHTML=`Graguda Tyranu Evavu! Gedd lacka.
        Ugavu drecka <b>${U(s.move)}</b> ga`}function y(s){e=s,h(s.open,o),L(s,u)}function k(){t.dataset.status="lost";let s=e.lastGuess===1?"Evavu":"Tyranu",a=s==="Evavu"?"Tyranu":"Evavu";v.innerHTML=`You guessed ${s}. The correct answer was ${a}.
        You managed <b>${T(e)}</b> correct guesses...
        That's worth <b>0 np</b>!`,h(e.deck[0],c)}function b(){t.dataset.status="run",x(),y(C())}let M=["tyranu","evavu"];for(let s of M){let a=document.createElement("input");a.type="image",a.src=s==="evavu"?A:Y,a.value=s,g.appendChild(a)}return t.appendChild(f),t.appendChild(i),t.appendChild(u),t.appendChild(n),t.appendChild(r),t.appendChild(g),d.addEventListener("click",b),t.addEventListener("click",s=>{let a=s.target.value;if(!a)return;let E={evavu:1,tyranu:0}[a];if(E==null)return;let m=S(e,E);if(m.status===2&&k(),m.status===1){t.innerHTML="";let l=document.createElement("a");l.textContent="YOU WON!!! CLICK TO CLAIM YOUR PRIZE!!!",l.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ",t.appendChild(l)}y(m)}),b(),t}var Q=`[data-status] {
    font-family: sans-serif;
    text-align: center;
    justify-content: center;
}

[data-status] fieldset {
    border: none;
}

[data-status] input {
    display: block;
    margin: 0 auto;
}

[data-status] .cards {
    display: flex;
    justify-content: center;
    column-gap: 8px;
}
[data-status] .cards img {
    border: 1px solid #ddd;
}


[data-status="lost"] fieldset,
[data-status="lost"] .move {
    display: none;
}

[data-status="run"] .scream,
[data-status="run"] .summary {
    display: none;
}

.scream {
    font-size: 36px;
    font-weight: bold;
}
.move,
.summary {
    white-space: pre-line;
}`;if(window.location.href.endsWith("/gameroom/?game=tyranuevavu")){document.body.insertAdjacentHTML("afterend",`<style>${Q}</style>`);let e=document.querySelector(".content");e.parentNode.replaceChild(F(),e)}})();
