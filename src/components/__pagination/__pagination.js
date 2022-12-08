let pagination = document.querySelector('.pagination')

if (pagination) {

  let obj = {}

  let totalPages = $('.pagination__page').length - 2

  for (let i = 1, current = 1; i<=totalPages; i++, current += 12) {
    obj[i] = [current, current + 11]
  }

  let paginationPage = parseInt($(pagination).attr('actpage'), 10)
  let previousButton = document.querySelector('.pagination__arrow-previous')
  previousButton.style.display = 'none'

  $('.pagination__page').on('click', function(){

    let go = $(this).attr('href').replace('#!', '');
    if (go === '+1') {
      paginationPage++;
    } else if (go === '-1') {
      paginationPage--;
    }else{
      paginationPage = parseInt(go, 10);
    }
    $(pagination).attr('actpage', paginationPage);

    if (paginationPage > 1) {
      previousButton.style.display = 'inline-block'
    } else {
      previousButton.style.display = 'none'
    }

    const paginationFrom = document.querySelector('.pagination__from')
    const paginationTo = document.querySelector('.pagination__to')
    paginationFrom.textContent = obj[paginationPage][0]
    paginationTo.textContent = obj[paginationPage][1]

  })
}