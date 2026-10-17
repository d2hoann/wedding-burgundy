import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WEDDING } from './wedding-data';

type Wish = { name: string; message: string; time: string };
type RSVP = { name: string; count: number; attending: boolean };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  readonly w = WEDDING;
  private readonly doc = inject(DOCUMENT);
  readonly opened = signal(false);
  readonly opening = signal(false);
  readonly activePhoto = signal(0);
  readonly showGift = signal(false);
  readonly giftTab = signal<'groom'|'bride'>('groom');
  readonly musicPlaying = signal(false);
  readonly countdown = signal({days: 0, hours: 0, minutes: 0, seconds: 0});
  readonly wishes = signal<Wish[]>([]);
  readonly rsvpDone = signal(false);
  readonly wishDone = signal(false);
  guestName = '';
  guestCount = 1;
  attending = true;
  wishName = '';
  wishMessage = '';
  private timer?: ReturnType<typeof setInterval>;
  private audio?: HTMLAudioElement;

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
    this.wishes.set(this.readStorage<Wish[]>('wedding-wishes', []));
    // Có thể gửi link kèm ?guest=Tên%20khách để cá nhân hóa lời mời.
    const guest = new URLSearchParams(this.doc.location?.search ?? '').get('guest');
    if (guest) this.guestName = guest.slice(0, 80);
  }
  ngOnDestroy(): void { if (this.timer) clearInterval(this.timer); this.audio?.pause(); }

  openInvitation(): void {
    if (this.opening()) return;
    this.opening.set(true);
    setTimeout(() => {
      this.opened.set(true);
      this.doc.body.classList.add('invitation-opened');
      this.doc.defaultView?.scrollTo({top: 0, behavior: 'instant'});
    }, 1050);
  }
  private tick(): void {
    let remaining = Math.max(0, new Date(this.w.weddingISO).getTime() - Date.now());
    const days = Math.floor(remaining / 86400000); remaining %= 86400000;
    const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
    const minutes = Math.floor(remaining / 60000); remaining %= 60000;
    const seconds = Math.floor(remaining / 1000);
    this.countdown.set({days, hours, minutes, seconds});
  }
  pad(value: number): string { return String(value).padStart(2,'0'); }
  selectPhoto(index: number): void {
    this.activePhoto.set((index + this.w.photos.length) % this.w.photos.length);
  }
  submitRSVP(): void {
    const name = this.guestName.trim();
    if (!name || this.guestCount < 1 || this.guestCount > 20) return;
    const rows = this.readStorage<RSVP[]>('wedding-rsvps', []);
    rows.push({name, count: this.guestCount, attending: this.attending});
    this.saveStorage('wedding-rsvps', rows);
    this.rsvpDone.set(true);
  }
  submitWish(): void {
    const name = this.wishName.trim(); const message = this.wishMessage.trim();
    if (!name || !message) return;
    const next = [{name, message, time: new Date().toLocaleDateString('vi-VN')}, ...this.wishes()].slice(0, 100);
    this.wishes.set(next);
    this.saveStorage('wedding-wishes', next);
    this.wishMessage = '';
    this.wishDone.set(true);
  }
  toggleMusic(): void {
    if (!this.w.musicUrl) return;
    if (!this.audio) { this.audio = new Audio(this.w.musicUrl); this.audio.loop = true; }
    if (this.audio.paused) {
      this.audio.play().then(() => this.musicPlaying.set(true)).catch(() => this.musicPlaying.set(false));
    } else { this.audio.pause(); this.musicPlaying.set(false); }
  }
  private readStorage<T>(key: string, fallback: T): T {
    try { const data = this.doc.defaultView?.localStorage.getItem(key); return data ? JSON.parse(data) as T : fallback; }
    catch { return fallback; }
  }
  private saveStorage<T>(key: string, value: T): void {
    try { this.doc.defaultView?.localStorage.setItem(key, JSON.stringify(value)); } catch { /* private browsing */ }
  }
}
