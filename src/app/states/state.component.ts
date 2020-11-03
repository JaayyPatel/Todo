import { Component } from '@angular/core';


@Component({ templateUrl: 'state.component.html' })
export class stateComponent {
  current:any=[];
  States:any=[
    {
      St:'done',
    },
    {
      St:'not in mood',
    },
    {
      St:'pending',
    },
    {
      St:'depends on others',
    },
    {
      St:'will be done today',
    },
    {
      St:'will be done tommorrow',
    },
    {
      St:'may be...not like',
    },
    {
      St:'may be...not like',
    },
    {
      St:'may be...not like',
    },
    {
      St:'may be...not like',
    },
  ];
  addstate(sta)
    {
      var adstate = {
        St:sta
      };
      this.current.push(adstate);

    };
    storestates()
    {

    localStorage.setItem("states",JSON.stringify(this.current));

    };

}
