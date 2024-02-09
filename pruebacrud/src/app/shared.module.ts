import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
 imports:      [ CommonModule, BrowserAnimationsModule, BrowserModule],
 declarations: [ ],
 exports:      [ CommonModule, FormsModule, BrowserAnimationsModule,BrowserModule]
})
export class SharedModule { }
