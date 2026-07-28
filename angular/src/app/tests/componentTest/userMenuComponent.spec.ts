import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserMenuComponent } from '../../component/usersMenu/userMenu.component';
import { MenuItem } from '../../component/usersMenu/userMenu.component';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { ArticleCommandeService } from '../../services/articleCommande.service';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let roleService: { getRoles: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let registerService: { getPseudo: ReturnType<typeof vi.fn>; logout: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    roleService = { getRoles: vi.fn().mockReturnValue(of([{ label: 'LOGISTICIEN' }])) };
    router = { navigate: vi.fn() };
    registerService = {
      getPseudo: vi.fn().mockReturnValue('logisticien123'),
      logout: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [UserMenuComponent],
      providers: [
        { provide: RoleService, useValue: roleService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {}, queryParams: {} } } },
        { provide: RegisterService, useValue: registerService },
        { provide: ArticleCommandeService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
  });

  it('crée le composant', () => {
    expect(component).toBeTruthy();
  });

  it('charge le pseudo depuis RegisterService', () => {
    fixture.detectChanges();
    expect(component.pseudo).toBe('logisticien123');
  });

  it('charge les rôles et construit le menu correspondant', () => {
    fixture.detectChanges();
    expect(roleService.getRoles).toHaveBeenCalled();
    expect(component.role).toBe('LOGISTICIEN');
    expect(component.menuItems.some(item => item.route === '/picking')).toBe(true);
  });

  it('navigue vers la route du rôle chargé', () => {
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/logisticien']);
  });

  it('gère une erreur de chargement des rôles sans planter', () => {
    roleService.getRoles.mockReturnValue({
      subscribe: ({ error }: any) => error(new Error('fail'))
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('retourne le menu visiteur par défaut pour un rôle inconnu', () => {
    const items = component.getMenuItems('INCONNU');
    expect(items.some(item => item.label === 'Login')).toBe(true);
  });

  it('bascule isSidebarCollapsed et émet sidebarToggle', () => {
    const emitSpy = vi.spyOn(component.sidebarToggle, 'emit');
    const initial = component.isSidebarCollapsed;
    component.toggleSidebar();
    expect(component.isSidebarCollapsed).toBe(!initial);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('ouvre un item de menu avec enfants si la sidebar est étendue', () => {
    const item: MenuItem = { icon: '', label: 'Test', route: '/test', children: [{ icon: '', label: 'Sub', route: '/sub' }] };
    component.isSidebarCollapsed = false;
    component.toggleMenuItem(item);
    expect(item.isOpen).toBe(true);
  });

  it("n'ouvre pas un item si la sidebar est réduite", () => {
    const item: MenuItem = { icon: '', label: 'Test', route: '/test', children: [{ icon: '', label: 'Sub', route: '/sub' }] };
    component.isSidebarCollapsed = true;
    component.toggleMenuItem(item);
    expect(item.isOpen).toBeUndefined();
  });

  it('navigue vers /cart au clic sur le panier', () => {
    component.goToCart();
    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('déconnecte et redirige vers / au logout', () => {
    component.logout();
    expect(registerService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});