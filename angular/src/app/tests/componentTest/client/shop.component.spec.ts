import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { ShopComponent } from "../../../component/client/shop.component";
import { ProduitService } from "../../../services/produit.service";
import { RouterModule } from "@angular/router";
import { Observable, of} from "rxjs";

describe("ShopComponent", () => {
    let component: ShopComponent;
    let fixture: ComponentFixture<ShopComponent>;

    const mockProduitService = {
        getProduits: vi.fn(),
        searchProduits: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockProduitService.getProduits.mockReturnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [ShopComponent, FormsModule, ReactiveFormsModule, RouterModule.forRoot([])],
            providers: [
                { provide: ProduitService, useValue: mockProduitService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ShopComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge tous les produits au démarrage (valeur initiale vide)', () => {
        const mockData = [
            { id: 1, nom: 'Assiette', prix: 10, quantiteStock: 20, perissable: false, datePeremption: null, dernierAjout: null, fournisseur: { nom: '', email: '', adresse: '' } }
        ];
        mockProduitService.getProduits.mockReturnValue(of(mockData));

        fixture.detectChanges();

        expect(mockProduitService.getProduits).toHaveBeenCalled();
        expect(mockProduitService.searchProduits).not.toHaveBeenCalled();
        expect(component.produits).toEqual(mockData);
    });

    it('appelle searchProduits quand filterfcvar change avec une valeur non vide', () => {
        const mockResults = [{ id: 2, nom: 'Verre', prix: 5 }];
        mockProduitService.searchProduits.mockReturnValue(of(mockResults));

        fixture.detectChanges();
        component.filterfcvar.setValue('Verre');

        expect(mockProduitService.searchProduits).toHaveBeenCalledWith('Verre');
        expect(component.produits).toEqual(mockResults);
    });

    it('recharge getProduits quand filterfcvar redevient vide', () => {
        fixture.detectChanges();
        component.filterfcvar.setValue('Verre');
        component.filterfcvar.setValue('');

        expect(mockProduitService.getProduits).toHaveBeenCalledTimes(3);
    });

    it('log une erreur si le chargement échoue', () => {
        mockProduitService.getProduits.mockReturnValue(
            new Observable(subscriber => subscriber.error({ status: 500 }))
        );
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        fixture.detectChanges();

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});