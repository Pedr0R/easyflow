import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      width: 100vw;
    }
    .login-box {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .login-header {
      text-align: center;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }
    input {
      padding: 0.75rem 1rem;
      background: var(--color-bg-surface-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      color: var(--color-text-primary);
      width: 100%;
    }
    input:focus {
      outline: none;
      border-color: var(--color-primary);
    }
    .error-msg {
      color: #f43f5e;
      font-size: 0.85rem;
      text-align: center;
    }
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private themeService = inject(ThemeService); // to trigger theme init on login page

  loginForm = this.fb.group({
    email: ['admin@easyflow.com', [Validators.required, Validators.email]],
    senha: ['admin123', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');

    const { email, senha } = this.loginForm.value;
    
    this.auth.login({ email: email!, senha: senha! }).subscribe({
      next: () => {
        window.location.href = '/'; // Simple hard redirect to bootstrap dashboard routing
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Erro ao realizar login');
      }
    });
  }
}
