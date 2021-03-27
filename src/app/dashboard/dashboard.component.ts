import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    errMessage: string;
    notes: Note = new Note();
    noteList: Array<Note>;
    constructor(private noteService: NotesService) {

    }
    step = 0;

    setStep(index: number) {
      this.step = index;
    }

    nextStep() {
      this.step++;
    }

    prevStep() {
      this.step--;
    }

    //function to add note
    addNotes() {


      if (!this.notes.title || !this.notes.text) {
        this.errMessage = 'Title and Text both are required fields';
        return;
      }



      this.noteService.addNote(this.notes).subscribe((response) => {
        // alert("Note Saved in JSON Format")
        if (response) {
          this.noteList.push(this.notes)
          this.getNotes()

        }
        else {
          this.errMessage = "cannot add this notes"
        }

      }, error => {
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'
        return;
      })

      this.step++;

    }



    ngOnInit() {
      this.getNotes()
    }



    getNotes() {
      this.noteService.getNotes().subscribe((response) => {
        // console.log(response.reverse())
        if (response)
          this.noteList = response.reverse()
        else
          this.errMessage = "Not able to retrieve notes"
      }, error => {
        console.log(error)
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'
        return;
      })
    }
}


