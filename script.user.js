// ==UserScript==
// @name         NPC Tyranu Evavu
// @namespace    https://github.com/windupbird144/
// @version      0.2
// @description  Clone of world famous card game Tyranu Evavu 
// @author       github.com/windupbird144
// @include        https://neopetsclassic.com/gameroom/?game=tyranuevavu
// @include      https://neopetsclassic.com/gameroom/
// @grant        none
// @license      MIT
// ==/UserScript==
(()=>{var l=["clubs","diamonds","hearts","spades"];function M(){let e=[];for(let t=2;t<=14;t++)for(let n of l)e.push({face:n,value:t});return e}function G(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}function C(){let e=M();return G(e),{open:e.pop(),deck:e,move:1,status:0,lastGuess:null}}function E(e){return e.move-1}function j(e){return{...e,open:e.deck[0],deck:e.deck.slice(1),move:e.move+1}}function H(e){return{...e,status:1}}function O(e){return{...e,status:2}}function W(e,t){return e.value===t.value?0:e.value<t.value?-1:e.value>t.value?1:0}function T(e,t){let n=W(e.open,e.deck[0]),o=e;return n===0||n<0&&t===0||n>0&&t===1?e.deck.length===1?o=H(e):o=j(e):o=O(e),{...o,lastGuess:t}}window.location.pathname==="/gameroom/"&&document.querySelector("#center").insertAdjacentHTML("beforeend",'<center><a href="/gameroom/?game=tyranuevavu">Tyranu Evavu</a></center>');function $(e){function t(){if(e<10||e>20){if(e%10===1)return"st";if(e%10===2)return"nd";if(e%10===3)return"rd"}return"th"}return e+t()}var U="https://i.ibb.co/dLkT8hx/montage.gif",N="https://i.ibb.co/NL9khyL/back1.gif",P="https://i.ibb.co/5GM88gN/uga-jubjub.gif",R="https://i.ibb.co/BBgTnk7/tyranu.gif",Y="https://i.ibb.co/T4QnGjp/evavu.gif",x=70;function A(e){let t=e.value-2,n=l.indexOf(e.face);return(t*4+n)*x}function B(){let e,t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("img"),u=document.createElement("p"),i=document.createElement("p"),p=document.createElement("img"),c=document.createElement("img"),r=document.createElement("div"),f=document.createElement("p"),v=document.createElement("fieldset"),d=document.createElement("button");n.appendChild(o),n.appendChild(c),r.appendChild(f),r.appendChild(d),t.id="tyranu-evavu",t.dataset.status="run",p.src=P,i.innerText="Uhhg Uuuuuuhhhhgggg!",d.innerText="Try again",i.classList.add("scream"),r.classList.add("summary"),u.classList.add("move"),n.classList.add("cards");function S(){c.src=N,c.style.objectPosition="initial"}function g(s,a){a.width=x,a.height=90,a.src=U,a.style.objectPosition=`-${A(s)}px 0`,a.style.objectFit="none"}function w(s,a){a.innerHTML=`Graguda Tyranu Evavu! Gedd lacka.
        Ugavu drecka <b>${$(s.move)}</b> ga`}function h(s){e=s,g(s.open,o),w(s,u)}function L(){t.dataset.status="lost";let[s,a]=e.lastGuess===1?["Evavu","Tyranu"]:["Tyranu","Evavu"];f.innerHTML=`You guessed ${s}. The correct answer was ${a}.
        You managed <b>${E(e)}</b> correct guesses...
        That's worth <b>0 np</b>!`,g(e.deck[0],c)}function y(){t.dataset.status="run",S(),h(C())}let k=["tyranu","evavu"];for(let s of k){let a=document.createElement("input");a.type="image",a.src=s==="evavu"?Y:R,a.value=s,v.appendChild(a)}return t.appendChild(p),t.appendChild(i),t.appendChild(u),t.appendChild(n),t.appendChild(r),t.appendChild(v),d.addEventListener("click",y),t.addEventListener("click",s=>{let a=s.target.value;if(!a)return;let b={evavu:1,tyranu:0}[a];if(b!=null&&(h(T(e,b)),e.status===2&&L(),e.status===1)){t.innerHTML="";let m=document.createElement("a");m.textContent="YOU WON!!! CLICK TO CLAIM YOUR PRIZE!!!",m.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ",t.appendChild(m)}}),y(),t}var F=`[data-status] {
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
}`;if(window.location.href.endsWith("/gameroom/?game=tyranuevavu")){document.body.insertAdjacentHTML("afterend",`<style>${F}</style>`);let e=document.querySelector(".content");e.parentNode.replaceChild(B(),e)}})();
