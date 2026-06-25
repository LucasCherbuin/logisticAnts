import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { AdminDashboardService } from "../../services/adminDashboard.service";
import { DeleteCommandeComponent } from "../../component/client/deleteCommande.component";
import { CommandeService } from "../../services/commande.service";
import { UserService } from "../../services/user.service";
import { MailService } from "../../services/mailer.service";
import { of } from "rxjs";

describe("DeleteCommandeComponent", () => {
    let component: DeleteCommandeComponent;
    let fixture: ComponentFixture<DeleteCommandeComponent>;

    const mockCommandeService = {
        deleteCommande: vi.fn()
    };
    const mockUserService = {
        getUsers: vi.fn()
    };
    const mockMailService = {
        sendMail: vi.fn()
    };
    const mockAdminDashboardService = {
        createPrix: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockUserService.getUsers.mockReturnValue(of([]));
        await TestBed.configureTestingModule({
            imports: [DeleteCommandeComponent],
            providers: [
                { provide: CommandeService, useValue: mockCommandeService },
                { provide: UserService, useValue: mockUserService },
                { provide: MailService, useValue: mockMailService },
                { provide: AdminDashboardService, useValue: mockAdminDashboardService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(DeleteCommandeComponent);
        component = fixture.componentInstance;
        component.commandeId = 42;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge le premier utilisateur au démarrage', () => {
        const mockUsers = [
            { id: 1, pseudo: 'louis', email: 'louis@gmail.com', password: '1234', role: 'CLIENT' }
        ];
        mockUserService.getUsers.mockReturnValue(of(mockUsers));
        fixture.detectChanges();
        expect(mockUserService.getUsers).toHaveBeenCalledOnce();
        expect(component.user).toEqual(mockUsers[0]);
    });

    describe('remboursement', () => {
        it('enregistre un remboursement après suppression', () => {
            const mockUser = { id: 1, pseudo: 'louis', email: 'louis@gmail.com', password: '1234', role: 'CLIENT' };
            mockUserService.getUsers.mockReturnValue(of([mockUser]));
            mockCommandeService.deleteCommande.mockReturnValue(of(null));
            mockMailService.sendMail.mockReturnValue(of(null));
            mockAdminDashboardService.createPrix.mockReturnValue(of(null));
            fixture.detectChanges();
            component.execDelete();
            expect(mockAdminDashboardService.createPrix).toHaveBeenCalledWith({
                prixTotal: 0,
                remboursement: 1,
                achat: 0,
                date: expect.any(Date)
            });
        });
});

    describe('execDelete()', () => {
        it('supprime la commande et envoie un email', () => {
            const mockUser = { id: 1, pseudo: 'louis', email: 'louis@gmail.com', password: '1234', role: 'CLIENT' };
            mockUserService.getUsers.mockReturnValue(of([mockUser]));
            mockCommandeService.deleteCommande.mockReturnValue(of(null));
            mockMailService.sendMail.mockReturnValue(of(null));
            mockAdminDashboardService.createPrix.mockReturnValue(of(null));
            fixture.detectChanges();
            component.execDelete();
            expect(mockCommandeService.deleteCommande).toHaveBeenCalledWith(42);
            expect(mockMailService.sendMail).toHaveBeenCalledWith({
                to: mockUser.email,
                subject: 'Commande supprimée',
                body: `Votre commande 42 a été supprimée. Le remboursement arrivera dans quelques jours.`
            });
        });
    });
});