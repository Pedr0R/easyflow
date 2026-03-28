import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimeTrackingService, Punch } from '../../core/time-tracking.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styles: `
    .hero-section {
      padding: 3rem;
      margin-bottom: 2rem;
      background: linear-gradient(145deg, color-mix(in srgb, var(--color-bg-surface-elevated) 80%, transparent), color-mix(in srgb, var(--color-bg-surface) 60%, transparent));
      border-left: 4px solid var(--color-primary);
    }
    .hero-section h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .hero-section p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .cta-group {
      display: flex;
      gap: 1rem;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    .card {
      padding: 2rem;
    }
    .card h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--color-text-primary);
    }
    .empty-state {
      color: var(--color-text-muted);
      text-align: center;
      padding: 2rem 0;
      background: color-mix(in srgb, var(--color-text-primary) 5%, transparent);
      border-radius: var(--border-radius-md);
      border: 1px dashed var(--color-border);
    }
    
    .loading-pulse {
      animation: pulse 1.5s infinite ease-in-out;
      opacity: 0.7;
    }
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    
    .punch-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .punch-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-border);
    }
    .punch-item:last-child {
      border-bottom: none;
    }
    .punch-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .punch-meta {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .punch-obs {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      font-style: italic;
      background: color-mix(in srgb, var(--color-bg-surface-elevated) 40%, transparent);
      padding: 0.5rem 0.75rem;
      border-radius: var(--border-radius-sm);
      margin-top: 0.25rem;
    }
    .punch-time {
      font-weight: 500;
      font-size: 0.95rem;
    }
    .punch-type {
      font-weight: 600;
    }
    .badge-entrada { color: var(--color-accent); }
    .badge-saida { color: #f43f5e; }
  `
})
export class DashboardComponent implements OnInit {
  public timeService = inject(TimeTrackingService);
  private cdr = inject(ChangeDetectorRef);

  todayPunches: Punch[] = [];
  loadingPunches = true;
  loadingPunchAction = false;

  get lastPunchType(): 'ENTRADA' | 'SAIDA' | null {
    if (this.todayPunches.length === 0) return null;
    return this.todayPunches[this.todayPunches.length - 1].tipo;
  }

  get nextPunchActionLabel(): string {
    return this.lastPunchType === 'ENTRADA' ? 'Punch Out' : 'Punch In';
  }
  
  get nextPunchType(): 'ENTRADA' | 'SAIDA' {
    return this.lastPunchType === 'ENTRADA' ? 'SAIDA' : 'ENTRADA';
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loadingPunches = true;
    this.timeService.getTodayPunches().subscribe({
      next: (punches) => {
        if (Array.isArray(punches)) {
          this.todayPunches = punches;
        }
        this.loadingPunches = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingPunches = false;
        this.cdr.detectChanges();
      }
    });
  }

  async handlePunch() {
    this.loadingPunchAction = true;
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.sendPunchRequest(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.warn('Geolocation denied or failed, defaulting to 0,0', error);
            this.sendPunchRequest(0, 0);
          }
        );
      } else {
        this.sendPunchRequest(0, 0);
      }
    } catch (e) {
      this.sendPunchRequest(0, 0);
    }
  }

  private sendPunchRequest(lat: number, lng: number) {
    this.timeService.punch(this.nextPunchType, lat, lng).subscribe({
      next: () => {
        this.fetchData(); // Reload list
        this.loadingPunchAction = false;
      },
      error: () => {
        this.loadingPunchAction = false;
      }
    });
  }
}
