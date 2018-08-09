export function viewHtml(ul,item){
        return $(`<li class="list-group-item"><i style="font-size:10px">ch-</i>${item.value}</li>`)
          .appendTo( ul );
} 