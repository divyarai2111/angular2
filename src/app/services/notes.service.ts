import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {
  private localUrl:string
  private token:string

  constructor(private httpClient:HttpClient,
    private authenticationService:AuthenticationService) {
      this.localUrl='http://localhost:3000/api/v1/notes'
      this.token=authenticationService.getBearerToken();

  }

  getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>(this.localUrl,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    })
  
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes',note,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    })
 
  }

}
