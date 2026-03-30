import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Signup } from '../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin = false
  authError:String = "";
  constructor(private sellerService: SellerService, private router: Router, private seller: SellerService) {}