import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabUserComponent } from './grab-user.component';

describe('GrabUserComponent', () => {
  let component: GrabUserComponent;
  let fixture: ComponentFixture<GrabUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrabUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrabUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
