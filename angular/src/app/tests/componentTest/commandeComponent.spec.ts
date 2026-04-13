import { ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { CommandeComponent } from 'src/app/component/commandes/commande.component';


describe('CommandeComponent', () => {
  let component: CommandeComponent;
  let fixture: ComponentFixture<CommandeComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeComponent ]
    })
    .compileComponents();
  });

    beforeEach(() => {
    fixture = TestBed.createComponent(CommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 