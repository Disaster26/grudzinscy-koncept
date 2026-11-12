(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false');document.body.style.overflow='';}});}

  document.querySelectorAll('.swipe').forEach(function(sw){
    var t=sw.querySelector('.track'),prev=sw.querySelector('[data-prev]'),next=sw.querySelector('[data-next]'),dots=sw.querySelector('.dots');
    var items=t.children;
    if(dots){for(var i=0;i<items.length;i++){dots.appendChild(document.createElement('i'));}}
    function step(){return items.length>1?items[1].offsetLeft-items[0].offsetLeft:t.clientWidth;}
    function upd(){var max=t.scrollWidth-t.clientWidth-2;sw.classList.toggle('static',max<=0);if(prev)prev.disabled=t.scrollLeft<=2;if(next)next.disabled=t.scrollLeft>=max;
      if(dots){var k=Math.round(t.scrollLeft/step());if(t.scrollLeft>=max)k=items.length-1;[].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===k);});}}
    if(prev)prev.addEventListener('click',function(){t.scrollBy({left:-step(),behavior:'smooth'});});
    if(next)next.addEventListener('click',function(){t.scrollBy({left:step(),behavior:'smooth'});});
    t.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
    var down=false,sx=0,sl=0,moved=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;t.classList.add('drag');}t.scrollLeft=sl-dx;});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var s=step();t.classList.remove('drag');t.scrollTo({left:Math.round(t.scrollLeft/s)*s,behavior:'smooth'});}});
    t.addEventListener('click',function(e){if(moved){e.preventDefault();moved=false;}},true);
    t.addEventListener('dragstart',function(e){e.preventDefault();});
  });

  document.querySelectorAll('form.form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var ok=f.querySelector('.ok');if(ok)ok.style.display='block';});});

  document.querySelectorAll('.years a').forEach(function(a){a.addEventListener('click',function(){var d=document.querySelector(a.getAttribute('href'));if(d&&d.tagName==='DETAILS')d.open=true;});});
  if(location.hash){var d=document.querySelector(location.hash);if(d&&d.tagName==='DETAILS')d.open=true;}

  var ck=document.querySelector('.ck');
  if(ck){var v=null;try{v=localStorage.getItem('ck')}catch(e){}
    if(!v)ck.classList.add('show');
    ck.querySelectorAll('[data-ck]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ck',x.getAttribute('data-ck'))}catch(e){}ck.classList.remove('show');});});}
})();
