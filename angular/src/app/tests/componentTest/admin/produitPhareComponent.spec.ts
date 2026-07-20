import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { ProduitPhareComponent } from "../../../component/dashboardAdmin/ProduitPhare.component";
import { AdminDashboardService } from "../../../services/adminDashboard.service";
import { skip } from 'rxjs/operators';
import { of } from "rxjs";

describe("ProduitPhareComponent", () => {
    let component: ProduitPhareComponent;
    let fixture: ComponentFixture<ProduitPhareComponent>;

    const mockData = {
        produits: [
            { id: '1', produit: 'Produit A', achat: 5 },
            { id: '2', produit: 'Produit B', achat: 2 },
            { id: '3', produit: 'Produit C', achat: 8 }
        ],
        achats: 15
    };

    const mockAdminDashboardService = {
        getAllProduitPhareDashboard: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockAdminDashboardService.getAllProduitPhareDashboard.mockReturnValue(of(mockData));

        await TestBed.configureTestingModule({
            imports: [ProduitPhareComponent],
            providers: [
                { provide: AdminDashboardService, useValue: mockAdminDashboardService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduitPhareComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les produits phare au démarrage', () => {
        fixture.detectChanges();
        expect(mockAdminDashboardService.getAllProduitPhareDashboard).toHaveBeenCalledOnce();
        expect(component.produit).toEqual(mockData.produits);
        expect(component.achats).toBe(15);
    });

    it('initialise filteredProduitPhare$ après chargement', () => {
        fixture.detectChanges();
        expect(component.filteredProduitPhare$).toBeDefined();
    });

    it('trie par produit par défaut', async () => {
        fixture.detectChanges();
        const result = await new Promise(resolve => {
            component.filteredProduitPhare$.subscribe(resolve);
        });
        expect(result).toBeDefined();
    });

    it('trie par achat quand le champ sélectionné est achat', async () => {
        fixture.detectChanges();

        const result = await new Promise<any[]>(resolve => {
            component.filteredProduitPhare$
                .pipe(skip(1))
                .subscribe(resolve);

            component.filterField.setValue('achat');
        });

        expect(result.map(p => p.achat)).toEqual([2, 5, 8]);
    });
});