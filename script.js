const selects = document.querySelectorAll('.select');

window.addEventListener('DOMContentLoaded', () => {
  selects.forEach(select => {
    const button = select.querySelector('button');
    const full_height = [];
    
    [...select.querySelectorAll('div > a')].map(link => {
      const styles = window.getComputedStyle(link);
      const box = link.getBoundingClientRect();
      const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom) || 0;
      const height = box.height + margin;
      full_height.push(height);

      link.addEventListener('click', () => {
        const link_text = link.textContent;
        const button_text = button.textContent;
        button.textContent = link_text;
        button.style.animationName="popOut";
        button.addEventListener("animationend", () => {
          button.style.animationName="none"
        });
        const span = document.createElement('span');
        span.textContent = button_text;
        link.innerHTML = "";
        link.appendChild(span)
        link.blur()
      })
    });
    
    const totalHeight = full_height.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    select.dataset.totalHeight = totalHeight;
    select.style.setProperty('--max-height', totalHeight);  
  });
});
