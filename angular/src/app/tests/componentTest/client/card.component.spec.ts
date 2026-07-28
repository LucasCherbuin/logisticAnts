import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { CardComponent } from "../../../component/client/card.component";
import { ArticleCommandeService } from "../../../services/articleCommande.service";
import { RouterModule } from "@angular/router";
import { BehaviorSubject } from "rxjs";

describe("CardComponent", () => {

    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    const cartSubject = new BehaviorSubject<any[]>([]);

    const mockArticleCommandeService = {
        cartItems$: cartSubject,
        addToCart: vi.fn()
    };


    beforeEach(async () => {

        vi.clearAllMocks();

        cartSubject.next([]);

        await TestBed.configureTestingModule({
            imports: [
                CardComponent,
                RouterModule.forRoot([])
            ],
            providers: [
                {
                    provide: ArticleCommandeService,
                    useValue: mockArticleCommandeService
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();


        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;

    });


    it("crée le composant", () => {

        expect(component).toBeTruthy();

    });


    it("reçoit les produits via Input", () => {

        const produits = [
            {
                id: 1,
                nom: "Assiette",
                prix: 10,
                quantiteStock: 20,
                perissable: false,
                datePeremption: null,
                dernierAjout: null,
                fournisseur: []
            }
        ] as any;


        component.produits = produits;

        fixture.detectChanges();


        expect(component.produits)
            .toEqual(produits);

    });


    it("retourne le nombre d'articles dans le panier", () => {

        cartSubject.next([
            {
                produit: { id: 1 },
                quantite: 2
            },
            {
                produit: { id: 2 },
                quantite: 1
            }
        ]);


        expect(component.cartCount)
            .toBe(2);

    });


    it("appelle addToCart avec le produit", () => {

        const produit = {
            id: 1,
            nom: "Assiette",
            prix: 10
        } as any;


        component.addToCart(produit);


        expect(mockArticleCommandeService.addToCart)
            .toHaveBeenCalledWith(produit);

    });


});