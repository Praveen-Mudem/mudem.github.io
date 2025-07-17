import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/home">Go Back to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 50px;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #ff6b6b;
      font-size: 3rem;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 30px;
    }
    
    a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    
    a:hover {
      background-color: #0056b3;
    }
  `]
})
export class NotFoundComponent { }