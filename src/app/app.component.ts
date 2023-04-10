import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, interval, takeUntil } from 'rxjs';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  faPhone = faPhone;
  unsubscribe$: Subject<void> = new Subject<void>();
  timer$ : Observable<Number>;
  seconds : number = 0;
  minutes : number = 0;
  isRunning : boolean = false;

  
  constructor(){
    this.timer$ = interval(1000).pipe(
      takeUntil(this.unsubscribe$)
    );
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  

  toggleTimer(){
    if(this.isRunning){
      this.stopTimer();
    }
    else{ 
      this.startTimer();
    }
   
  };


  startTimer(){
    this.isRunning = true;
    this.timer$.subscribe(()=>{
      this.seconds++;
      if(this.seconds === 60){
        this.minutes++;
        this.seconds = 0;
      }
    });
  }


  stopTimer(){
    this.isRunning = false;
    this.unsubscribe$.next();
    this.seconds = 0;
    this.minutes = 0;

  };
}
