import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '0XJlwlozHbEd9xR4pmXsBBDEnT57j1P7';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter(
        (prevTag) => prevTag !== tag
      );
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 6);
    this.saveToLocalStorage();
  }

  async searchTag(tag: string) {
    if (tag.length <= 1) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(({ data }) => {
        this.gifsList = data;
      });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
}
