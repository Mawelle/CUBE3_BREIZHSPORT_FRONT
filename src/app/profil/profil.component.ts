import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommandeService } from "../services/commande.service";
import { Commande } from "../models/model_commande";
import { usersList } from "../mock/mock-users";


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule, MatButtonModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})


export class ProfilComponent implements OnInit {
  user = usersList[0]
  commandes : Commande[] = [];

  getQuantiteArticles(commandes: { tableau_articles: any[]; }): number {
    return commandes.tableau_articles.reduce((total, article) => total + article.quantite, 0);
  }

  constructor(private formBuilder: FormBuilder, private commandeService: CommandeService) {}

  monFormulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email() {
    return this.monFormulaire.get('email');
  }

  ngOnInit(): void{
    const idUser = this.user.id;
    console.log(this.user.id);
    
    this.commandeService.getAllCommandes(idUser)
    .subscribe((data)=>{
      this.commandes = data;
      console.log("les commandes", this.commandes);
    });
  }
}
