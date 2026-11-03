document.addEventListener('DOMContentLoaded',()=>{
 const currentFile=(location.pathname.split('/').pop()||'index.html').split('?')[0].split('#')[0];
 document.querySelectorAll('.nav-links a').forEach(link=>{
   const target=(link.getAttribute('href')||'').split('/').pop().split('#')[0].split('?')[0];
   if(target===currentFile){link.classList.add('active');link.setAttribute('aria-current','page');}
 });

 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
 if(toggle&&nav) toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const amount=document.querySelector('#loanAmount'),rate=document.querySelector('#interestRate'),months=document.querySelector('#loanTenure');
 if(amount&&rate&&months){
  const fmt=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  const update=()=>{let p=Number(amount.value),annual=Number(rate.value),n=Number(months.value),r=annual/1200;let emi=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);let total=emi*n;let e=document.querySelector('#emiValue');if(e)e.textContent=fmt(emi);let pEl=document.querySelector('#principalValue');if(pEl)pEl.textContent=fmt(p);let iEl=document.querySelector('#interestValue');if(iEl)iEl.textContent=fmt(total-p);let tEl=document.querySelector('#totalValue');if(tEl)tEl.textContent=fmt(total);let aLabel=document.querySelector('#amountLabel');if(aLabel)aLabel.textContent=fmt(p);let rLabel=document.querySelector('#rateLabel');if(rLabel)rLabel.textContent=annual.toFixed(1)+'%';let mLabel=document.querySelector('#monthsLabel');if(mLabel)mLabel.textContent=n+' months';};
  [amount,rate,months].forEach(el=>el.addEventListener('input',update));update();
 }
 document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const msg=form.querySelector('.form-message');if(msg){msg.style.display='block';msg.textContent='Thank you. This is a website demo, so your details have not been sent. Connect an approved backend before publishing to receive enquiries.';}form.reset();}));
});
