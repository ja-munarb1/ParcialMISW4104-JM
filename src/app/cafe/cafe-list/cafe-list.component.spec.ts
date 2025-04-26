import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../services/cafe.service';
import { Cafe } from '../models/cafe';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;
  let mockCafes: Cafe[];
  let cafeService: CafeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CafeListComponent],
      providers: [CafeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    cafeService = TestBed.inject(CafeService);

    // Creamos un listado de 3 cafés para la prueba
    mockCafes = [
      new Cafe(1, 'Café Especial de Colombia', 'Café de Origen', 'Colombia', 'Intenso', 1800, 'imagen1.jpg'),
      new Cafe(2, 'Café Orgánico de Etiopía', 'Blend', 'Etiopía', 'Suave', 1500, 'imagen2.jpg'),
      new Cafe(3, 'Café Premium de Brasil', 'Café de Origen', 'Brasil', 'Medio', 1200, 'imagen3.jpg')
    ];

    // Espiamos el método getCafes del servicio para que devuelva nuestros cafés de prueba
    spyOn(cafeService, 'getCafes').and.returnValue(of(mockCafes));

    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three cafe rows plus header row', () => {
    // Verificamos que se han llamado a los servicios necesarios
    expect(cafeService.getCafes).toHaveBeenCalled();
    
    // Verificamos que el componente tiene los cafés esperados
    expect(component.cafes.length).toBe(3);
    
    // Verificamos que la tabla tiene las filas esperadas (3 filas + 1 header)
    const tableRows = debug.queryAll(By.css('table tr'));
    expect(tableRows.length).toBe(4); // 3 cafés + 1 encabezado
    
    // Verificamos que las filas de datos (excluyendo el encabezado) son 3
    const dataRows = debug.queryAll(By.css('tbody tr'));
    expect(dataRows.length).toBe(3);
  });

  it('should calculate correct coffee counts by type', () => {
    // Verificamos que calcula correctamente el número de cafés de origen (2)
    expect(component.cafesTipoOrigen).toBe(2);
    
    // Verificamos que calcula correctamente el número de cafés blend (1)
    expect(component.cafesTipoBlend).toBe(1);
    
    // Verificamos que los párrafos muestran los valores correctos
    const paragraphs = debug.queryAll(By.css('p.fw-bold'));
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].nativeElement.textContent).toContain('Total café de origen: 2');
    expect(paragraphs[1].nativeElement.textContent).toContain('Total café blend: 1');
  });
});
