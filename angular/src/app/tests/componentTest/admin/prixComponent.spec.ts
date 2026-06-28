import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { PrixComponent } from "../../../component/dashboardAdmin/Prix.component";
import { AdminDashboardService } from "../../../services/adminDashboard.service";
import { of } from "rxjs";

describe("PrixComponent", () => {
    let component: PrixComponent;
    let fixture: ComponentFixture<PrixComponent>;

    const mockAdminDashboardService = {
        getAllPrix: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockAdminDashboardService.getAllPrix.mockReturnValue(of({
            remboursement: 101,
            achat: 413,
            date: '2026-06-24T13:00:00.000+00:00'
        }));

        await TestBed.configureTestingModule({
            imports: [PrixComponent],
            providers: [
                { provide: AdminDashboardService, useValue: mockAdminDashboardService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PrixComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les valeurs prix au démarrage', () => {
        fixture.detectChanges();
        expect(mockAdminDashboardService.getAllPrix).toHaveBeenCalledOnce();
        expect(component.remboursement).toBe(101);
        expect(component.achat).toBe(413);
        expect(component.prixTotal).toBe(514);
    });

    it('calcule prixTotal comme somme de achat et remboursement', () => {
        fixture.detectChanges();
        expect(component.prixTotal).toBe(component.achat + component.remboursement);
    });
});